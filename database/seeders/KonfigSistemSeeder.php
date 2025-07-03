<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KonfigSistemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('konfig_sistem')->insert([
            [
                'url' => 'https://www.universitas.com',
                'logo' => 'logo.png',
                'background' => 'background.jpg',
                'sms' => 'sms-api.com',
                'website' => 'https://www.universitas.com',
                'youtube' => 'https://youtube.com/universitas',
                'themes' => 'default-theme',
                'singkatan' => 'UNIV',
                'versi' => '1.0',
                'port_url' => '8080',
                'ico_path' => 'favicon.ico',
                'mode_debug' => true,
                'mode_production' => false,
                'mode_maintenance' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'url' => 'https://www.example.com',
                'logo' => 'logo2.png',
                'background' => 'background2.jpg',
                'sms' => 'sms-api2.com',
                'website' => 'https://www.example.com',
                'youtube' => 'https://youtube.com/example',
                'themes' => 'custom-theme',
                'singkatan' => 'EXMPL',
                'versi' => '2.0',
                'port_url' => '9090',
                'ico_path' => 'favicon2.ico',
                'mode_debug' => false,
                'mode_production' => true,
                'mode_maintenance' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
