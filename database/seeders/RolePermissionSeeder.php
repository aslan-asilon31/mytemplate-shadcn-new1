<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\PermissionGroup;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Group Permissions
        $groupedPermissions = [
            'Users' => [
                'users-data',
                'users-create',
                'users-update',
                'users-delete',
                'users-show',
            ],
            'Units' => [
                'units-data',
                'units-create',
                'units-update',
                'units-delete',
            ],
            'Suppliers' => [
                'suppliers-data',
                'suppliers-create',
                'suppliers-update',
                'suppliers-delete',
            ],
            'Stocks' => [
                'stocks-data',
                'stocks-create',
            ],
            'Sales' => [
                'sales-data',
                'sales-create',
                'sales-show',
            ],
            'Roles' => [
                'roles-data',
                'roles-create',
                'roles-update',
                'roles-delete',
            ],
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

        // Insert Permission Groups & Permissions
        foreach ($groupedPermissions as $groupName => $permissions) {
            $group = PermissionGroup::firstOrCreate(['name' => $groupName]);

            foreach ($permissions as $permissionName) {
                Permission::firstOrCreate([
                    'name' => $permissionName,
                    'guard_name' => 'web',
                ], [
                    'permission_group_id' => $group->id
                ])->update([
                    'permission_group_id' => $group->id // ensure it's updated
                ]);
            }
        }

        // Define Role => Permissions
        $rolesWithPermissions = [
            'users-data-show' => [
                'users-data',
                'users-show',
            ],
            'users-full-access' => [
                'users-data',
                'users-create',
                'users-update',
                'users-delete',
                'users-show',
            ],
            'units-full-access' => [
                'units-data',
                'units-create',
                'units-update',
                'units-delete',
            ],
            'suppliers-full-access' => [
                'suppliers-data',
                'suppliers-create',
                'suppliers-update',
                'suppliers-delete',
            ],
            'stocks-full-access' => [
                'stocks-data',
                'stocks-create',
            ],
            'sales-full-access' => [
                'sales-data',
                'sales-create',
                'sales-show',
            ],
            'roles-full-access' => [
                'roles-data',
                'roles-create',
                'roles-update',
                'roles-delete',
            ],
            'reports-full-access' => [
                'report-card-stocks',
                'report-stocks',
                'report-orders',
                'report-pending-order-receives',
                'report-sales',
                'report-best-selling-products',
            ],
            'product-variants-show' => [
                'product-variants-data',
                'product-variants-show',
            ],
            'product-variants-full-access' => [
                'product-variants-data',
                'product-variants-create',
                'product-variants-update',
                'product-variants-delete',
                'product-variants-show',
            ],
        ];

        // Create Roles and Assign Permissions
        foreach ($rolesWithPermissions as $roleName => $permissionNames) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
            $role->syncPermissions($permissionNames);
        }

        // Create admin user & assign all permissions
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('123456'),
            ]
        );

        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminRole->syncPermissions(Permission::all());
        $adminUser->assignRole($adminRole);
    }
}
