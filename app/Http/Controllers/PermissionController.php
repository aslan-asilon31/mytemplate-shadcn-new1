<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Permission;
use App\Models\PermissionGroup;

class PermissionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            // new Middleware('permission:permissions-index', only: ['index']),
            // new Middleware('permission:permissions-create', only: ['create', 'store']),
            // new Middleware('permission:permissions-edit', only: ['edit', 'update']),
            // new Middleware('permission:permissions-delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $groups = PermissionGroup::with(['permissions' => function ($query) use ($request) {
            $query->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', '%' . $request->search . '%')
            );
        }])->get(); // gunakan paginate di sini


        return inertia('permissions/index', [
            'groups' => $groups,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $availablePermissions = Permission::pluck('name'); // ['permissions-index', 'permissions-create', etc]

        return inertia('permissions/create', [
            'available_permissions' => $availablePermissions,
        ]);
    }



    public function edit(Permission $permission)
    {
        return inertia('permissions/edit', [
            'permission' => $permission,
            'groups' => PermissionGroup::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'group_name' => 'required|min:3|max:255|unique:permission_groups,name',
            'permissions' => 'required|array|min:1',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $group = PermissionGroup::create([
            'name' => $validated['group_name'],
        ]);

        foreach ($validated['permissions'] as $permName) {
            $permission = Permission::where('name', $permName)->first();
            $permission->update(['permission_group_id' => $group->id]);
        }

        return to_route('permissions.index');
    }


    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255|unique:permissions,name,' . $permission->id,
            'permission_group_id' => 'required|exists:permission_groups,id',
        ]);

        $permission->update($validated);

        return to_route('permissions.index');
    }

    public function destroy(Permission $permission)
    {
        // delete permissions data
        $permission->delete();

        // render view
        return back();
    }
}
