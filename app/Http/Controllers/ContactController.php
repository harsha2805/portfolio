<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(ContactRequest $request): JsonResponse
    {
        Mail::to(config('mail.from.address'))->send(new ContactMail($request->validated()));

        return response()->json(['message' => 'Message sent successfully.']);
    }
}
