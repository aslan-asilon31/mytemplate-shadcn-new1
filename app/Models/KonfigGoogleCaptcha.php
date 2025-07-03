<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonfigGoogleCaptcha extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'konfig_google_captcha';

    // Tentukan kolom yang bisa diisi massal
    protected $fillable = [
        'url', 
        'recaptcha_site', 
        'recaptcha_secret'
    ];

    // Tentukan kolom yang tidak boleh diisi massal
    protected $guarded = ['id'];

    // Menambahkan timestamps jika diperlukan
    public $timestamps = true;
}
