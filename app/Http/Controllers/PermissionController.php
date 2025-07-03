<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Illuminate\Routing\Controller;

class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:permissions-data')->only(['index']);
        $this->middleware('permission:permissions-create')->only(['create', 'store']);
        $this->middleware('permission:permissions-edit')->only(['edit', 'update']);
        $this->middleware('permission:permissions-delete')->only(['destroy']);
    }

    public function index(Request $request)
    {
        $permissions = Permission::query()
            ->when(
                $request->search,
                fn($q) =>
                $q->where('name', 'like', '%' . $request->search . '%')
            )
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        $userPermissions = \Illuminate\Support\Facades\Auth::user()->getAllPermissions()->pluck('name')->toArray();

        return Inertia::render('permissions/index', [
            'userPermissions' => $userPermissions,
            'permissions' => $permissions,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('permissions/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name',
        ]);

        Permission::create($validated);

        return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('permissions/edit', [
            'permission' => $permission,
        ]);
    }



    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
        ]);

        $permission->update($validated);

        return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();

        return back()->with('success', 'Permission deleted successfully.');
    }
}
