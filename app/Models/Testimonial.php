<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    /** @var list<string> */
    protected $fillable = ['name', 'role', 'quote', 'is_approved', 'email', 'verification_code', 'verification_expires_at', 'email_verified_at'];

    /** @var list<string> */
    protected $hidden = ['verification_code'];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return [
            'is_approved' => 'boolean',
            'verification_expires_at' => 'datetime',
            'email_verified_at' => 'datetime',
        ];
    }

    /** @param Builder<Testimonial> $query */
    public function scopeApproved(Builder $query): void
    {
        $query->where('is_approved', true);
    }
}
