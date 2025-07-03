<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KonfigPaymentGatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('konfig_payment_gateway')->insert([
            [
                'url' => 'https://payment-gateway1.com',
                'server_key' => 'server-key-1',
                'client_key' => 'client-key-1',
                'aktifkan' => true,
                'sanbox_mode' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'url' => 'https://payment-gateway2.com',
                'server_key' => 'server-key-2',
                'client_key' => 'client-key-2',
                'aktifkan' => false,
                'sanbox_mode' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
