<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PostController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // permissions route
    Route::resource('/permissions', PermissionController::class);
    // roles route
    Route::resource('roles', RoleController::class)->except('show');
    Route::resource('/posts', PostController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
