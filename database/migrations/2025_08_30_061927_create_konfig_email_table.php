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
        Schema::create('konfig_email', function (Blueprint $table) {
            $table->id();
            $table->string('email_resmi');
            $table->string('host_email');
            $table->string('send_email');
            $table->string('password_send_email');
            $table->string('smptp_debug_email');
            $table->string('smptp_scure_email');
            $table->string('smptp_auth_email');
            $table->string('port_email');
            $table->boolean('notif_ke_email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konfig_email');
    }
};
