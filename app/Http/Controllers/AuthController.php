<?php

namespace App\Http\Controllers;

use App\Services\user\DTO\UserDto;
use App\Services\user\UserService;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService, Request $request)
    {
        parent::__construct($request);
        $this->userService = $userService;
    }
    public function register(): RedirectResponse
    {
        Log::info('This method registers user.', ['email' => $this->request->get('email')]);

        $userDto = new UserDto(
            $this->request->input('name'),
            $this->request->input('email'),
            $this->request->input('password')
        );
        $this->userService->create($userDto);

        return back()->with('success', 'Register successfully');
    }

    public function login(): Application|Redirector|RedirectResponse
    {
        $credentials = [
            'email' => $this->request->email,
            'password' => $this->request->password,
        ];

        if (Auth::attempt($credentials)) {
            return redirect('/main')->with('success', 'Login success');
        }

        Log::warning('Email or/and Password invalid.', ['email' => $this->request->get('email')]);

        return back()->with('error', 'Email or Password invalid');
    }

    public function logout(): RedirectResponse
    {
        Auth::logout();

        return redirect()->route('login');
    }
}
