<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'Admin']);
        $user = Role::create(['name' => 'User']);

        $admin->givePermissionTo([
            'create-user',
            'edit-user',
            'delete-user',
            'create-todo',
            'edit-todo',
            'delete-todo',
        ]);

        $user->givePermissionTo([
            'view-todo',
            'create-todo',
        ]);
    }
}
