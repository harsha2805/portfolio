<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TestimonialVerificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public string $code) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Verify your review',
        );
    }

    public function content(): Content
    {
        return new Content(
            htmlString: <<<HTML
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;background:#0a0a0a;color:#fff;border-radius:12px;">
                <p style="font-size:14px;color:#a0a0a0;margin-bottom:8px;letter-spacing:0.1em;text-transform:uppercase;">Review Verification</p>
                <h1 style="font-size:24px;font-weight:700;margin:0 0 24px;">Verify your review</h1>
                <p style="color:#a0a0a0;margin-bottom:32px;">Use the code below to confirm your email address. It expires in 15 minutes.</p>
                <div style="background:#1a1a1a;border:1px solid #333;border-radius:10px;padding:20px;text-align:center;margin-bottom:32px;">
                    <span style="font-size:36px;font-weight:700;letter-spacing:0.25em;font-family:monospace;color:#a855f7;">{$this->code}</span>
                </div>
                <p style="font-size:12px;color:#555;">If you did not submit a review, you can safely ignore this email.</p>
            </div>
            HTML,
        );
    }

    /** @return array<int, \Illuminate\Mail\Mailables\Attachment> */
    public function attachments(): array
    {
        return [];
    }
}
