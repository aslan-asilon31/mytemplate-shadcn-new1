<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonfigPaymentGateway extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'konfig_payment_gateway';

    // Tentukan kolom yang bisa diisi massal
    protected $fillable = [
        'url', 
        'server_key', 
        'client_key', 
        'aktifkan', 
        'sanbox_mode'
    ];

    // Tentukan kolom yang tidak boleh diisi massal
    protected $guarded = ['id'];

    // Menambahkan timestamps jika diperlukan
    public $timestamps = true;
}
