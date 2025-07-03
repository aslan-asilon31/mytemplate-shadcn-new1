<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdentitasUniversitas extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'identitas_universitas';

    // Tentukan kolom yang bisa diisi massal
    protected $fillable = [
        'univ_identitas_id', 
        'sistem_univ_id', 
        'email_univ_id', 
        'google_captcha_univ_id', 
        'config_univ_id', 
        'wa_gateway_univ_id', 
        'payment_gateway_univ_id', 
        'info_univ_id'
    ];

    // Tentukan kolom yang tidak boleh diisi massal
    protected $guarded = ['id'];

    // Menambahkan timestamps jika diperlukan
    public $timestamps = true;

    // Definisikan relasi
    public function univIdentitas()
    {
        return $this->belongsTo(KonfigUniversitas::class, 'univ_identitas_id');
    }

    public function sistemUniv()
    {
        return $this->belongsTo(KonfigSistem::class, 'sistem_univ_id');
    }

    public function emailUniv()
    {
        return $this->belongsTo(KonfigEmail::class, 'email_univ_id');
    }

    public function googleCaptchaUniv()
    {
        return $this->belongsTo(KonfigGoogleCaptcha::class, 'google_captcha_univ_id');
    }

    public function configUniv()
    {
        return $this->belongsTo(KonfigUniversitas::class, 'config_univ_id');
    }

    public function waGatewayUniv()
    {
        return $this->belongsTo(KonfigWAGateway::class, 'wa_gateway_univ_id');
    }

    public function paymentGatewayUniv()
    {
        return $this->belongsTo(KonfigPaymentGateway::class, 'payment_gateway_univ_id');
    }

    public function infoUniv()
    {
        return $this->belongsTo(KonfigUniversitas::class, 'info_univ_id');
    }
}
