<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PermissionGroup extends Model
{
    protected $table = 'permission_groups';

    use HasFactory;

    protected $fillable = ['name'];

    public function permissions()
    {
        return $this->hasMany(\Spatie\Permission\Models\Permission::class);
    }
}
