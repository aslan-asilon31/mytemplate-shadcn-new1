<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Arsip extends Model
{
        use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'arsip';

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
