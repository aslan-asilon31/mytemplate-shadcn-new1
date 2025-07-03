<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonfigSistem extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'konfig_sistem';

    // Tentukan kolom yang bisa diisi massal
    protected $fillable = [
        'url', 
        'logo', 
        'background', 
        'sms', 
        'website', 
        'youtube', 
        'themes', 
        'singkatan', 
        'versi', 
        'port_url', 
        'ico_path', 
        'mode_debug', 
        'mode_production', 
        'mode_maintenance'
    ];

    // Tentukan kolom yang tidak boleh diisi massal
    protected $guarded = ['id'];

    // Menambahkan timestamps jika diperlukan
    public $timestamps = true;
}
