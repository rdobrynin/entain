<?php

use Illuminate\Support\Facades\Route;

Route::get('/{url}', function () {
    $path = public_path('app/index.html');
    abort_unless(file_exists($path), 400, 'Page is not Found!');
    return file_get_contents($path);
})
    ->where('url', '(login|register|todo|users)')
    ->name('frontend');

Route::get('/', function () {
    $path = public_path('app/index.html');
    abort_unless(file_exists($path), 400, 'Page is not Found!');
    return file_get_contents($path);
})
    ->name('frontend');

