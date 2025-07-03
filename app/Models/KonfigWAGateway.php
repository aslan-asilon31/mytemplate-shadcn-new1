<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonfigWAGateway extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'konfig_wa_gateway';

    // Tentukan kolom yang bisa diisi massal
    protected $fillable = [
        'url_api_wa', 
        'id_device', 
        'api_wa', 
        'footer_wa', 
        'aktif_wa', 
        'konfirmasi_wa'
    ];

    // Tentukan kolom yang tidak boleh diisi massal
    protected $guarded = ['id'];

    // Menambahkan timestamps jika diperlukan
    public $timestamps = true;
}
