<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use App\Models\PermissionGroup;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\Middleware;


class UserController extends Controller
{
    public function __construct()
    {
        return [
            new middleware('permission:users-data', only: ['index']),
            new middleware('permission:users-create', only: ['create', 'store']),
            new middleware('permission:users-edit', only: ['edit', 'update']),
            new middleware('permission:users-delete', only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $userPermissions = \Illuminate\Support\Facades\Auth::user()->getAllPermissions()->pluck('name')->toArray();
        $users = User::with('roles')
            ->when(
                $request->search,
                fn($query) =>
                $query->where('name', 'like', '%' . $request->search . '%')
            )
            ->latest()
            ->paginate(6);

        return inertia('users/index', [
            'userPermissions' => $userPermissions,
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $roles = Role::all();

        return Inertia::render('users/create', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        dd($request);

        $validated = $request->validate([
            'name'     => 'required|string|min:3|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:4',
            'role'     => 'required|string',
        ]);

        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        $roles = Role::where('name', '!=', 'super-admin')->get();

        $user->load(['roles', 'permissions']);

        // Ambil semua permission dari role yang dimiliki user
        $rolePermissions = $user->roles
            ->flatMap(fn($role) => $role->permissions)
            ->pluck('id')
            ->unique();

        // Ambil group (App\Models\Group) yang memiliki relasi dengan role yang dimiliki user
        $rolePermissionGroups = Group::whereHas('roles', function ($query) use ($user) {
            $query->whereIn('roles.id', $user->roles->pluck('id'));
        })->pluck('name');

        // Ambil PermissionGroup yang ada dalam group tersebut, dan filter permission-nya sesuai dengan permission yang dimiliki role
        $groupedPermissions = Group::with(['permissions' => function ($q) use ($rolePermissions) {
            $q->whereIn('permissions.id', $rolePermissions);
        }])
            ->whereHas('permissions', function ($q) use ($rolePermissions) {
                $q->whereIn('permissions.id', $rolePermissions);
            })
            ->get()
            ->map(function ($group) use ($user) {
                return [
                    'groupId' => $group->id,
                    'groupName' => $group->name,
                    'permissions' => $group->permissions->map(function ($permission) use ($user) {
                        return [
                            'id' => $permission->id,
                            'name' => $permission->name,
                            'checked' => $user->permissions->contains('id', $permission->id),
                        ];
                    })->values(),
                ];
            });

        return inertia('users/edit', [
            'user' => $user,
            'roles' => $roles,
            'groupedPermissions' => $groupedPermissions,
            'rolePermissionGroups' => $rolePermissionGroups,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name'          => 'required|min:3|max:255',
            'email'         => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|min:1',
        ]);

        $user->update([
            'name'  => $request->name,
            'email' => $request->email,
        ]);

        $user->syncRoles($request->role);

        return redirect()->route('users.index')->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'User deleted.');
    }
}
