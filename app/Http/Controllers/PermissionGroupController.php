<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Permission;

class PermissionGroupController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:permissions-data', only: ['index']),
            new Middleware('permission:permissions-create', only: ['create', 'store']),
            new Middleware('permission:permissions-edit', only: ['edit', 'update']),
            new Middleware('permission:permissions-delete', only: ['destroy']),
        ];
    }


    public function index(Request $request)
    {
        $permissions = Permission::select('id', 'name')
            ->when($request->search, fn($search) => $search->where('name', 'like', '%' . $request->search . '%'))
            ->latest()
            ->paginate(6)->withQueryString();

        return inertia('permission-groups/index', ['permissions' => $permissions, 'filters' => $request->only(['search'])]);
    }


    public function create()
    {
        return inertia('permissions-groups/create');
    }


    public function store(Request $request)
    {
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions']);

        Permission::create(['name' => $request->name]);

        return to_route('permissions.index');
    }


    public function edit(Permission $permission)
    {
        return inertia('permissions-groups/edit', ['permission' => $permission]);
    }


    public function update(Request $request, Permission $permission)
    {
        $request->validate(['name' => 'required|min:3|max:255|unique:permissions,name,' . $permission->id]);

        $permission->update(['name' => $request->name]);

        return to_route('permissions.index');
    }


    public function destroy(Permission $permission)
    {
        $permission->delete();

        return back();
    }
}
