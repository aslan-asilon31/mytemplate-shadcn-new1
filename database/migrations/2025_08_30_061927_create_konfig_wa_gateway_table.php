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
        Schema::create('konfig_wa_gateway', function (Blueprint $table) {
            $table->id();
            $table->string('url_api_wa');
            $table->string('id_device');
            $table->string('api_wa');
            $table->string('footer_wa');
            $table->boolean('aktif_wa');
            $table->boolean('konfirmasi_wa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konfig_wa_gateway');
    }
};
