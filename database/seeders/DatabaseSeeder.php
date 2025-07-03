<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RolePermissionSeeder::class,
            PostSeeder::class,
            ArsipSeeder::class,
            IpAddressSeeder::class,
            KonfigEmailSeeder::class,
            KonfigGoogleCaptchaSeeder::class,
            KonfigPaymentGatewaySeeder::class,
            KonfigSistemSeeder::class,
            KonfigUniversitasSeeder::class,
            KonfigWAGatewaySeeder::class,
            IdentitasUniversitasSeeder::class,
        ]);
    }
}
