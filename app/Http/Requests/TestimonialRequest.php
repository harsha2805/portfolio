<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, array<string>> */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'quote' => ['required', 'string', 'min:20', 'max:2000'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name.',
            'role.required' => 'Please enter your role.',
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'quote.required' => 'Please enter your review.',
            'quote.min' => 'Your review must be at least 20 characters.',
        ];
    }
}
