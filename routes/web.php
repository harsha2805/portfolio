<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::post('/contact', [ContactController::class, 'store'])->middleware('throttle:3,1');

Route::get('/testimonials/data', [TestimonialController::class, 'index']);
Route::post('/testimonials/submit', [TestimonialController::class, 'store'])->middleware('throttle:3,1');
Route::post('/testimonials/verify', [TestimonialController::class, 'verify'])->middleware('throttle:5,1');

Route::get('clear/admin@2805', function () {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');

    return 'Cleared!';
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
