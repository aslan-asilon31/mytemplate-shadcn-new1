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
        Schema::create('konfig_payment_gateway', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('server_key');
            $table->string('client_key');
            $table->boolean('aktifkan');
            $table->boolean('sanbox_mode');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konfig_payment_gateway');
    }
};
