<?php
declare(strict_types=1);
namespace App\Http\Controllers\API;

use App\Classes\ApiResponseClass;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;

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

        if($validator->fails()){
            return ApiResponseClass::throw('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input)->assignRole('User');
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['name'] =  $user->name;
        $success['role_id'] =  $user->roles->first()->id;
        $success['role_name'] =  $user->roles->first()->name;
        $success['permissions'] =  $user->load('roles.permissions');
        return ApiResponseClass::sendResponse($success,'User register successfully.',201);
    }

    public function login(Request $request): JsonResponse
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['name'] =  $user->name;
            $success['role_id'] =  $user->roles->first()->id;
            $success['role_name'] =  $user->roles->first()->name;
            $success['permissions'] =  $user->load('roles.permissions');
            return ApiResponseClass::sendResponse($success,'User login successfully.',200);
        }
        else{
            return ApiResponseClass::throw('Unauthorised.', ['error'=>'Unauthorised']);
        }
    }
}
