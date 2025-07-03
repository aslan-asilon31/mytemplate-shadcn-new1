<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KonfigGoogleCaptchaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('konfig_google_captcha')->insert([
            [
                'url' => 'https://www.google.com/recaptcha/',
                'recaptcha_site' => 'your-site-key-here',
                'recaptcha_secret' => 'your-secret-key-here',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'url' => 'https://www.google.com/recaptcha/',
                'recaptcha_site' => 'another-site-key',
                'recaptcha_secret' => 'another-secret-key',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
