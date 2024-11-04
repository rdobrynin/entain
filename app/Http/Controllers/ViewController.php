<?php

namespace App\Http\Controllers;

class ViewController extends Controller
{

    function index(){
        return view('main');
    }
    function register(){
        return view('auth.register');
    }

    public function login()
    {
        return view('auth.login');
    }

}
