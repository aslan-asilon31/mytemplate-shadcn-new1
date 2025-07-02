<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class Group extends Model
{
    protected $fillable = ['name'];

    public function permissionGroups()
    {
        return $this->hasMany(PermissionGroup::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'permission_groups');
    }

    public function roles()
    {
        return $this->belongsToMany(
            \Spatie\Permission\Models\Role::class,
            'group_roles', // nama tabel pivot
            'group_id',
            'role_id'
        );
    }
}
