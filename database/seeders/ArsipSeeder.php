<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArsipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                DB::table('arsip')->insert([
            [
                'kode' => 'A001',
                'nama' => 'Dokumen 1',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode' => 'A002',
                'nama' => 'Dokumen 2',
                'status' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kode' => 'A003',
                'nama' => 'Dokumen 3',
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
