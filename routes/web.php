<?php

use App\Http\Controllers\User\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(UserController::class)->group(function(){
        Route::get('/users','index')->name('users.index');
        Route::post('/users','store')->name('users.store');
        Route::put("/users/{user}", "update")->name('users.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
