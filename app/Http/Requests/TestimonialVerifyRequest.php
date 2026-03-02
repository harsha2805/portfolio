<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestimonialVerifyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, array<string>> */
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:testimonials,id'],
            'code' => ['required', 'string', 'size:6'],
        ];
    }
}
