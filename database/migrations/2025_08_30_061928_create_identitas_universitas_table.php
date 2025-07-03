<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('identitas_universitas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('univ_identitas_id')->constrained('konfig_universitas')->onDelete('cascade');
            $table->foreignId('sistem_univ_id')->constrained('konfig_sistem')->onDelete('cascade');
            $table->foreignId('email_univ_id')->constrained('konfig_email')->onDelete('cascade');
            $table->foreignId('google_captcha_univ_id')->constrained('konfig_google_captcha')->onDelete('cascade');
            $table->foreignId('config_univ_id')->constrained('konfig_universitas')->onDelete('cascade');
            $table->foreignId('wa_gateway_univ_id')->constrained('konfig_wa_gateway')->onDelete('cascade');
            $table->foreignId('payment_gateway_univ_id')->constrained('konfig_payment_gateway')->onDelete('cascade');
            $table->foreignId('info_univ_id')->constrained('konfig_universitas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('identitas_universitas');
    }
};
