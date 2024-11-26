<?php

use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(RegisterController::class)->group(function () {
    Route::post('register', 'register')->name('register');
    Route::post('login', 'login')->name('login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('todo', TodoController::class);
    Route::apiResource('role', RoleController::class);
    Route::get('user', function (Request $request) {
        return $request->user();
    })->name('user');
});
