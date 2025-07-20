<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'manage users',
            'view sales',
            'create sales',
            'manage products'
        ];

        foreach($permissions as $permission)
        {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles
        $superAdmin = Role::firstOrCreate(['name' => 'superadmin']);
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $cashier = Role::firstOrCreate(['name' => 'cashier']);

        // Assign permissions
        $superAdmin->syncPermissions(Permission::all());
        $admin->syncPermissions([
            'manage users',
            'view sales',
            'manage products',
        ]);
        $cashier->syncPermissions([
            'create sales',
            'view sales'
        ]);
    }
}
