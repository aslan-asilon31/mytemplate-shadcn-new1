<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KonfigUniversitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('konfig_universitas')->insert([
            [
                'kode' => 'UNIV001',
                'nama' => 'Universitas A',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode' => 'UNIV002',
                'nama' => 'Universitas B',
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
