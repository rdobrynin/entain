<?php

namespace App\Services\user;

use App\Models\User;
use App\Repositories\user\UserRepository;
use App\Services\user\DTO\UserDto;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use stdClass;

class UserService implements IUserService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    public function create(UserDto $userDto): RedirectResponse|Redirector|Application | null
    {

       // Check if user has correct password and email we allow to logIn instead of throw error in registration flow
        if ($this->userRepository->isExistByEmail($userDto->email)) {
            $credentials = [
                'email' => $userDto->email,
                'password' => $userDto->password,
            ];

            if (Auth::attempt($credentials)) {
                return redirect('/main')->with('success', 'Login success');
            }
        }

        $user = new User();
        $user->name = $userDto->name;
        $user->email = $userDto->email;
        $user->password = $userDto->password;

        $user->save();

        return null;
    }

    public function getUserById(int $id): User {
        return User::where('id', $id)->first();
    }
}
