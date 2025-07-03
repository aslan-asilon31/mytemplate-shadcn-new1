<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class IpAddress extends Model
{
        use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'ip_address';

    // Tentukan kolom yang bisa diisi massal
    protected $fillable = [
        'ipaddress', 
        'keterangan', 
        'status'
    ];

    // Tentukan kolom yang tidak boleh diisi massal
    protected $guarded = ['id'];

    // Menambahkan timestamps jika diperlukan
    public $timestamps = true;
}
