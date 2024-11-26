<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        // Creating Admin User
        $admin = User::create([
            'name' => 'Roman Admin',
            'email' => 'user_1@entain.com',
            'password' => Hash::make('11111111'),
        ]);
        $admin->assignRole('Admin');

        // Creating Application User
        $user = User::create([
            'name' => 'Roman User',
            'email' => 'user_2@entain.com',
            'password' => Hash::make('11111111'),
        ]);
        $user->assignRole('User');
    }
}
