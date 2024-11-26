<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
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

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
