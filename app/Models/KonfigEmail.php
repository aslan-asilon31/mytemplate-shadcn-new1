<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonfigEmail extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi
    protected $table = 'konfig_email';

    // Tentukan kolom yang bisa diisi massal
    protected $fillable = [
        'email_resmi', 
        'host_email', 
        'send_email', 
        'password_send_email',
        'smptp_debug_email',
        'smptp_scure_email',
        'smptp_auth_email',
        'port_email',
        'notif_ke_email'
    ];

    // Tentukan kolom yang tidak boleh diisi massal
    protected $guarded = ['id'];

    // Menambahkan timestamps jika diperlukan
    public $timestamps = true;
}
