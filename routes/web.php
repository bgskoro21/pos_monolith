<?php

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/users', function () {
        return Inertia::render('users/user-index');
    })->name('users.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
