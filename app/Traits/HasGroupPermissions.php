<?php

namespace App\Traits;

use App\Models\PermissionGroup;
use Spatie\Permission\Models\Permission;

trait HasGroupPermissions
{
    /**
     * Assign seluruh permissions dari group ke role.
     */
    public function assignGroupPermissions(array $groupNames)
    {
        $permissions = Permission::whereHas('group', function ($q) use ($groupNames) {
            $q->whereIn('name', $groupNames);
        })->get();

        $this->syncPermissions($permissions);
    }

    /**
     * Ambil nama-nama group dari permissions milik role ini.
     */
    public function getPermissionGroups()
    {
        $permissionIds = $this->permissions->pluck('id');

        return PermissionGroup::whereHas('permissions', function ($q) use ($permissionIds) {
            $q->whereIn('id', $permissionIds);
        })->pluck('name');
    }
}
