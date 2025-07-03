<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IpAddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
               DB::table('ip_address')->insert([
            [
                'ipaddress' => '192.168.0.1',
                'keterangan' => 'Server utama',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ipaddress' => '192.168.0.2',
                'keterangan' => 'Server cadangan',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ipaddress' => '192.168.0.3',
                'keterangan' => 'Printer jaringan',
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
