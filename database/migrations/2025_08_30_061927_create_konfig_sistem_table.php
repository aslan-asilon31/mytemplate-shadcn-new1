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
        Schema::create('konfig_sistem', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->string('logo');
            $table->string('background');
            $table->string('sms');
            $table->string('website');
            $table->string('youtube');
            $table->string('themes');
            $table->string('singkatan');
            $table->string('versi');
            $table->string('port_url');
            $table->string('ico_path');
            $table->boolean('mode_debug');
            $table->boolean('mode_production');
            $table->boolean('mode_maintenance');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konfig_sistem');
    }
};
