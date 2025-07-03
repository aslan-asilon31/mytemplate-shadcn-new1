<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KonfigEmailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                DB::table('konfig_email')->insert([
            [
                'email_resmi' => 'admin@univ.com',
                'host_email' => 'smtp.univ.com',
                'send_email' => 'noreply@univ.com',
                'password_send_email' => 'password123',
                'smptp_debug_email' => 'debug_mode',
                'smptp_scure_email' => 'secure_email',
                'smptp_auth_email' => 'auth_email',
                'port_email' => '587',
                'notif_ke_email' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email_resmi' => 'support@univ.com',
                'host_email' => 'smtp.support.com',
                'send_email' => 'support@univ.com',
                'password_send_email' => 'support123',
                'smptp_debug_email' => 'debug_mode_support',
                'smptp_scure_email' => 'secure_support_email',
                'smptp_auth_email' => 'auth_support_email',
                'port_email' => '465',
                'notif_ke_email' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
