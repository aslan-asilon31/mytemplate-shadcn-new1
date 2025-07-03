<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\PermissionGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Routing\Controllers\Middleware;

class RoleController extends Controller
{

    public function __construct()
    {
        return [
            new middleware('role:users-data', only: ['index']),
            new middleware('role:users-create', only: ['create', 'store']),
            new middleware('role:users-edit', only: ['edit', 'update']),
            new middleware('role:users-delete', only: ['destroy']),
        ];
    }


    public function index(Request $request)
    {
        $userPermissions = \Illuminate\Support\Facades\Auth::user()->getAllPermissions()->pluck('name')->toArray();

        $perPage = $request->input('perPage', 10);

        $groups = Group::when($request->search, function ($q) use ($request) {
            $q->where('name', 'like', '%' . $request->search . '%');
        })
            ->with(['permissions', 'roles'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return inertia('roles/index', [
            'userPermissions' => $userPermissions,
            'groups' => $groups,
            'filters' => $request->only(['search', 'perPage']),
        ]);
    }

    public function create()
    {
        $permissions = Permission::pluck('name');
        $roles = Role::all();

        $groupedPermissions = [];
        foreach ($permissions as $perm) {
            $parts = explode('-', $perm, 2);
            $groupKey = isset($parts[1]) ? ucfirst($parts[0]) : 'Other';
            $groupedPermissions[$groupKey][] = $perm;
        }

        return inertia('roles/create', [
            'available_permissions' => $groupedPermissions,
            'available_roles' => $roles,
        ]);
    }

    public function edit($id)
    {
        $group = Group::with(['permissions', 'roles'])->findOrFail($id);
        $roles = Role::all();

        $allPermissions = Permission::pluck('name');
        $groupedPermissions = [];

        foreach ($allPermissions as $perm) {
            $parts = explode('-', $perm, 2);
            $groupKey = isset($parts[1]) ? ucfirst($parts[0]) : 'Other';
            $groupedPermissions[$groupKey][] = $perm;
        }

        $attachedRoles = $group->roles->pluck('id')->toArray();

        return inertia('roles/edit', [
            'group' => $group,
            'group_permissions' => $group->permissions,
            'available_permissions' => $groupedPermissions,
            'available_roles' => $roles,
            'attached_roles' => $attachedRoles,
        ]);
    }

    public function update(Request $request, $id)
    {
        $group = Group::with(['permissions', 'roles'])->findOrFail($id);

        $validated = $request->validate([
            'group_name' => 'required|min:3|max:255|unique:groups,name,' . $group->id,
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:permissions,name',
            'roles' => 'required|array|min:1',
            'roles.*' => 'exists:roles,id',
        ]);

        DB::transaction(function () use ($validated, $group) {
            $group->update(['name' => $validated['group_name']]);

            $permissionIds = Permission::whereIn('name', $validated['permissions'] ?? [])->pluck('id');
            $group->permissions()->sync($permissionIds);
            $group->roles()->sync($validated['roles']);
        });

        return redirect()->route('roles.index')->with('success', 'Permission group updated.');
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'group_name' => 'required|min:3|max:255|unique:groups,name', // Ensure group name is unique in the `groups` table
            'permissions' => 'required|array|min:1', // Ensure it's an array of permissions
            'permissions.*' => 'required|string', // Ensure each permission is a string (either ID or name)
        ]);

        DB::transaction(function () use ($validated) {
            // 1. Create the Group (with group_name)
            $group = Group::create(['name' => $validated['group_name']]);

            // 2. Convert permissions (names to IDs if necessary) and create PermissionGroup for each
            foreach ($validated['permissions'] as $perm) {
                // Check if $perm is a valid permission ID or a permission name
                $permission = null;

                // If $perm is a string (name), find the permission by name
                if (is_string($perm)) {
                    $permission = Permission::where('name', $perm)->first();
                }

                // If $perm is an integer (ID), find the permission by ID
                if (is_numeric($perm)) {
                    $permission = Permission::find($perm);
                }

                // If permission is found, associate it with the group
                if ($permission) {
                    PermissionGroup::create([
                        'group_id' => $group->id,
                        'permission_id' => $permission->id, // Associate permission ID
                    ]);
                }
            }
        });

        // Redirect with success message
        return redirect()->route('roles.index')->with('success', 'Permission group created.');
    }



    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'group_name' => 'required|min:3|max:255|unique:groups,name',
    //         'permissions' => 'required|array|min:1',
    //         'permissions.*' => 'required|string',
    //     ]);

    //     DB::transaction(function () use ($validated) {
    //         // 1. Buat Group utama
    //         $group = Group::create(['name' => $validated['group_name']]);

    //         // 3. Buat PermissionGroup untuk setiap permission dan hubungkan ke Group
    //         // $permissionGroup = PermissionGroup::create([
    //         //     'group_id' => $group->id,
    //         //     'name' => $validated['group_name'],
    //         // ]);

    //         // 4. Assign permission ke PermissionGroup

    //         foreach ($validated['permissions'] as $permId) {
    //             $permissionGroup = PermissionGroup::create([
    //                 'group_id' => $group->id,
    //                 'permission_id' => $permId,
    //             ]);
    //         }

    //         foreach ($validated['permissions'] as $permName) {
    //             $permission = Permission::where('name', $permName)->first();
    //             $permission->update(['permission_group_id' => $permissionGroup->id]);
    //         }
    //     });

    //     return redirect()->route('roles.index')->with('success', 'Permission group created.');
    // }


    public function destroy($id)
    {
        DB::transaction(function () use ($id) {
            $group = PermissionGroup::with('permissions')->findOrFail($id);

            foreach ($group->permissions as $permission) {
                DB::table('role_has_permissions')->where('permission_id', $permission->id)->delete();
                $permission->delete();
            }

            if ($group->group) {
                $group->group->roles()->detach();
                $group->group->delete();
            }

            $group->delete();
        });

        return back()->with('success', 'Permission group and related permissions deleted successfully.');
    }
}
