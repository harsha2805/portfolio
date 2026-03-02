<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Arjun Mehta',
                'role' => 'Founder, Nexaflow',
                'quote' => "Harsha shipped a complete redesign in two weeks. Clean code, smooth animations, and he anticipated edge cases I hadn't even considered.",
                'email' => 'verified@placeholder.dev',
                'email_verified_at' => now(),
                'is_approved' => true,
            ],
            [
                'name' => 'Priya Nair',
                'role' => 'Product Manager, TechVault',
                'quote' => "Working with Harsha was genuinely different. He doesn't just build what you ask — he thinks about what you actually need.",
                'email' => 'verified@placeholder.dev',
                'email_verified_at' => now(),
                'is_approved' => true,
            ],
            [
                'name' => 'Karan Shetty',
                'role' => 'Senior Engineer, CloudEdge',
                'quote' => "One of the sharpest engineers I've worked alongside. His attention to performance and UI detail is rare at any experience level.",
                'email' => 'verified@placeholder.dev',
                'email_verified_at' => now(),
                'is_approved' => true,
            ],
            [
                'name' => 'Meera Iyer',
                'role' => 'Design Lead, Pixelcraft',
                'quote' => "Harsha has an eye for design that most developers simply don't have. Every component he touched felt polished and intentional.",
                'email' => 'verified@placeholder.dev',
                'email_verified_at' => now(),
                'is_approved' => true,
            ],
        ];

        foreach ($testimonials as $data) {
            Testimonial::create($data);
        }
    }
}
