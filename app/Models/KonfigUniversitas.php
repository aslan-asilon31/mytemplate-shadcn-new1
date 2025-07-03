<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonfigUniversitas extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'konfig_universitas';

    // Tentukan kolom yang bisa diisi massal
    protected $fillable = [
        'kode', 
        'nama', 
        'status'
    ];

    // Tentukan kolom yang tidak boleh diisi massal
    protected $guarded = ['id'];

    // Menambahkan timestamps jika diperlukan
    public $timestamps = true;
}
