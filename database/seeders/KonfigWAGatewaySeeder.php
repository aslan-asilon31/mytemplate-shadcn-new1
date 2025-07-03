<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KonfigWAGatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('konfig_wa_gateway')->insert([
            [
                'url_api_wa' => 'https://api.whatsapp.com/send?phone=1234567890',
                'id_device' => 'device123',
                'api_wa' => 'your-api-key',
                'footer_wa' => 'Powered by WhatsApp',
                'aktif_wa' => true,
                'konfirmasi_wa' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'url_api_wa' => 'https://api.whatsapp.com/send?phone=0987654321',
                'id_device' => 'device456',
                'api_wa' => 'another-api-key',
                'footer_wa' => 'WhatsApp API Gateway',
                'aktif_wa' => false,
                'konfirmasi_wa' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
