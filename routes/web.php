<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\ViewController;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

/* @var $router Router */

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => 'guest'], function () {
    Route::get('/register', [ViewController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::get('/login', [ViewController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('/main', [MainController::class, 'index']);
    Route::get('/admin', [MainController::class, 'admin']);
    Route::delete('/logout', [AuthController::class, 'logout'])->name('logout');
});
