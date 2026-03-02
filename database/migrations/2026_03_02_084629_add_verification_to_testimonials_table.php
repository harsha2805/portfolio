<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('testimonials', function (Blueprint $table): void {
            $table->string('email', 255)->nullable()->after('quote');
            $table->string('verification_code', 6)->nullable()->after('email');
            $table->timestamp('verification_expires_at')->nullable()->after('verification_code');
            $table->timestamp('email_verified_at')->nullable()->after('verification_expires_at');
        });
    }

    public function down(): void
    {
        Schema::table('testimonials', function (Blueprint $table): void {
            $table->dropColumn(['email', 'verification_code', 'verification_expires_at', 'email_verified_at']);
        });
    }
};
