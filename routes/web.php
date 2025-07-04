<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CommentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('dashboard')->group(function () {

        // Roles Routes
        Route::get('/roles/group/{id}/edit', [RoleController::class, 'edit'])->name('roles.edit.byGroup');
        Route::delete('/roles/group/{id}', [RoleController::class, 'destroy'])->name('roles.destroyGroup');
        Route::resource('/roles', RoleController::class);

        // Permissions Routes
        Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');
        Route::get('/permissions/create', [PermissionController::class, 'create'])->name('permissions.create');
        Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store');
        Route::get('/permissions/{permission}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
        Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
        Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');

        // Users Routes
        Route::resource('users', UserController::class);
    });

    Route::prefix('master')->group(function () {
        Route::resource('jenis-arsip', \App\Http\Controllers\JenisArsipController::class);
        Route::resource('ip-address', \App\Http\Controllers\IpAddressController::class);
        Route::resource('identitas-univ', \App\Http\Controllers\IdentitasUnivController::class);
    });

    Route::resource('/comments', CommentController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
