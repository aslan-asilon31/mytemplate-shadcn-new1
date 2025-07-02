<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionGroup extends Model
{
    protected $fillable = ['group_id', 'permission_id'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(
            Permission::class,
            'permission_groups',
            'group_id',
            'permission_id'
        );
    }

    public function roles()
    {
        return $this->belongsToMany(\Spatie\Permission\Models\Role::class, 'group_role');
        // Sesuaikan nama tabel pivot jika bukan 'group_role'
    }
}
