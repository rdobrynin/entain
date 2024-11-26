<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Classes\ApiResponseClass;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return ApiResponseClass::throw('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input)->assignRole('User');
        $success = $this->getSuccess($user);

        return ApiResponseClass::sendResponse($success, 'User register successfully.', 201);
    }

    public function login(Request $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success = $this->getSuccess($user);

            return ApiResponseClass::sendResponse($success, 'User login successfully.', 200);
        } else {
            return ApiResponseClass::throw('Unauthorised.', ['error' => 'Unauthorised'], 401);
        }
    }

    public function getSuccess(?Authenticatable $user): array
    {
        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['name'] = $user->name;
        $success['role_id'] = $user->roles->first()->id;
        $success['role_name'] = $user->roles->first()->name;
        $data = $user->load('roles.permissions');
        $success['permissions'] = $data->roles[0]->permissions;

        return $success;
    }
}
