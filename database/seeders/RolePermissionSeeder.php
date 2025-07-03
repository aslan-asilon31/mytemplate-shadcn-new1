<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\PermissionGroup;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Step 1: Buat Groups dan isi pivot permission_groups
        $groupedPermissions = [
            'Users' => ['users-data', 'users-create', 'users-update', 'users-delete', 'users-show'],
            'Units' => ['units-data', 'units-create', 'units-update', 'units-delete'],
            'Suppliers' => ['suppliers-data', 'suppliers-create', 'suppliers-update', 'suppliers-delete'],
            'Stocks' => ['stocks-data', 'stocks-create'],
            'Sales' => ['sales-data', 'sales-create', 'sales-show'],
            'Roles' => ['roles-data', 'roles-create', 'roles-update', 'roles-delete'],
            'Reports' => [
                'report-card-stocks',
                'report-stocks',
                'report-orders',
                'report-pending-order-receives',
                'report-sales',
                'report-best-selling-products',
            ],
            'Product Variants' => [
                'product-variants-data',
                'product-variants-create',
                'product-variants-update',
                'product-variants-delete',
                'product-variants-show',
            ],
        ];

        foreach ($groupedPermissions as $groupName => $permissionNames) {
            $group = Group::firstOrCreate(['name' => $groupName]);

            foreach ($permissionNames as $permissionName) {
                // Create permission jika belum ada
                $permission = Permission::firstOrCreate([
                    'name' => $permissionName,
                    'guard_name' => 'web',
                ]);

                // Isi table pivot permission_groups
                PermissionGroup::firstOrCreate([
                    'group_id' => $group->id,
                    'permission_id' => $permission->id,
                ]);
            }
        }

        // Step 2: Assign group ke role via table group_roles
        $roleGroupMap = [
            'admin' => ['Users', 'Units', 'Suppliers', 'Stocks', 'Sales', 'Roles', 'Reports', 'Product Variants'],
            'super-admin' => ['Users', 'Units', 'Suppliers', 'Stocks', 'Sales', 'Roles', 'Reports', 'Product Variants'],
            'customer' => ['Sales', 'Product Variants'],
        ];

        foreach ($roleGroupMap as $roleName => $groupNames) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);

            foreach ($groupNames as $groupName) {
                $group = Group::where('name', $groupName)->first();
                if ($group) {
                    $group->roles()->syncWithoutDetaching([$role->id]);
                }
            }

            // Assign semua permission dari grup-grup tersebut ke role
            $permissions = \Spatie\Permission\Models\Permission::whereIn('id', function ($query) use ($groupNames) {
                $query->select('permission_id')
                    ->from('permission_groups')
                    ->join('groups', 'permission_groups.group_id', '=', 'groups.id')
                    ->whereIn('groups.name', $groupNames);
            })->get();


            $role->syncPermissions($permissions);
        }

        // Step 3: Buat user admin default
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('123456'),
            ]
        );

        $adminUser->assignRole('admin');
    }
}
