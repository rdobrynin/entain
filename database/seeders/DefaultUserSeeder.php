<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
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

        for ($i = 0; $i < 20; $i++) {
            $user_id = 888 + $i + 1;
            DB::table('users')->insert([
                'id' => $user_id,
                'name' => '_'.$i.'_dummy_user',
                'email' => '_'.$i.'_dummy_user@entain.com',
                'password' => bcrypt('11111111'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            DB::table('model_has_roles')->insert([
                'role_id' => $i % 2 === 0 ? 1 : 2,
                'model_type' => 'App\Models\User',
                'model_id' => $user_id,
            ]);

            DB::table('todos')->insert([
                'user_id' => $user_id,
                'text' => 'lorem ipsum _'.$i.'novel',
                'is_completed' => $i % 2 === 0,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
