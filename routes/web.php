<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [ContactController::class, 'store']);

Route::get('/testimonials/data', [TestimonialController::class, 'index']);
Route::post('/testimonials/submit', [TestimonialController::class, 'store']);
Route::post('/testimonials/verify', [TestimonialController::class, 'verify']);

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
