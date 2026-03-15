<?php

namespace App\Http\Controllers;

use App\Http\Requests\TestimonialRequest;
use App\Http\Requests\TestimonialVerifyRequest;
use App\Mail\TestimonialVerificationMail;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        $testimonials = Cache::remember('testimonials.approved', now()->addMinutes(5), fn () => Testimonial::approved()->latest()->get());

        return response()->json($testimonials);
    }

    public function store(TestimonialRequest $request): JsonResponse
    {
        $existing = Testimonial::where('email', $request->input('email'))
            ->whereNotNull('email_verified_at')
            ->latest()
            ->first();

        if ($existing && ! $request->boolean('confirm_update')) {
            return response()->json([
                'exists' => true,
                'existing' => [
                    'name' => $existing->name,
                    'role' => $existing->role,
                    'quote' => $existing->quote,
                ],
                'message' => 'A review already exists for this email.',
            ], 409);
        }

        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        if ($existing) {
            // Update existing testimonial — requires re-verification
            $existing->update([
                ...$request->validated(),
                'verification_code' => $code,
                'verification_expires_at' => now()->addMinutes(15),
                'email_verified_at' => null,
                'is_approved' => false,
            ]);

            Mail::to($request->input('email'))->send(new TestimonialVerificationMail($code));

            return response()->json(['id' => $existing->id, 'updated' => true]);
        }

        $testimonial = Testimonial::create([
            ...$request->validated(),
            'verification_code' => $code,
            'verification_expires_at' => now()->addMinutes(15),
            'email_verified_at' => null,
            'is_approved' => false,
        ]);

        Mail::to($request->input('email'))->send(new TestimonialVerificationMail($code));

        return response()->json(['id' => $testimonial->id]);
    }

    public function verify(TestimonialVerifyRequest $request): JsonResponse
    {
        $testimonial = Testimonial::findOrFail($request->input('id'));

        if ($testimonial->email_verified_at !== null) {
            return response()->json(['message' => 'Already verified.'], 409);
        }

        if ($testimonial->verification_code !== $request->input('code')) {
            return response()->json(['message' => 'Invalid verification code.'], 422);
        }

        if ($testimonial->verification_expires_at->isPast()) {
            return response()->json(['message' => 'Verification code has expired.'], 422);
        }

        $testimonial->update([
            'email_verified_at' => now(),
            'verification_code' => null,
        ]);

        return response()->json(['message' => 'Email verified. Review pending approval.']);
    }
}
