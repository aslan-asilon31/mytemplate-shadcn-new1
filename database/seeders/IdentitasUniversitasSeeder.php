<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IdentitasUniversitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('identitas_universitas')->insert([
            [
                'univ_identitas_id' => 1, // ID dari konfig_universitas
                'sistem_univ_id' => 1, // ID dari konfig_sistem
                'email_univ_id' => 1, // ID dari konfig_email
                'google_captcha_univ_id' => 1, // ID dari konfig_google_captcha
                'config_univ_id' => 1, // ID dari konfig_universitas
                'wa_gateway_univ_id' => 1, // ID dari konfig_wa_gateway
                'payment_gateway_univ_id' => 1, // ID dari konfig_payment_gateway
                'info_univ_id' => 1, // ID dari konfig_universitas
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'univ_identitas_id' => 2, // ID dari konfig_universitas
                'sistem_univ_id' => 2, // ID dari konfig_sistem
                'email_univ_id' => 2, // ID dari konfig_email
                'google_captcha_univ_id' => 2, // ID dari konfig_google_captcha
                'config_univ_id' => 2, // ID dari konfig_universitas
                'wa_gateway_univ_id' => 2, // ID dari konfig_wa_gateway
                'payment_gateway_univ_id' => 2, // ID dari konfig_payment_gateway
                'info_univ_id' => 2, // ID dari konfig_universitas
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
