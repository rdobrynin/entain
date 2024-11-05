<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    // password is qwerty
    public const PASSWORD = '$2y$12$/YIwt/CtcosxKTifO.rmv.uMXimtEHHAOAUAoOe17Q9EfJmlvmPua';
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        $data = [
            'name' => 'fake_',
            'email' => 'admin@test.com',
            'password' => self::PASSWORD,
        ];


        for ($i=1; $i < 20; $i++) {
            $data = array_merge($data, [
                'name' => 'fake_' . $i,
                'email' => 'fake_' . $i . '@test.com',
                'password' => self::PASSWORD,
            ]);
            DB::table('users')->insert(
                $data
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DELETE FROM users WHERE name like 'fake_%'");
    }
};
