<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(ContactRequest $request): JsonResponse
    {
        $turnstileResponse = Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => config('services.turnstile.secret'),
            'response' => $request->input('cf-turnstile-response'),
        ]);

        if (! $turnstileResponse->json('success')) {
            return response()->json(['message' => 'CAPTCHA verification failed.'], 422);
        }

        Mail::to(config('mail.from.address'))->queue(new ContactMail($request->validated()));

        return response()->json(['message' => 'Message sent successfully.']);
    }
}
