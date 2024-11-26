<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Classes\ApiResponseClass;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controllers\Middleware;

class UserController extends Controller
{
    private UserRepositoryInterface $roleRepositoryInterface;

    public function __construct(UserRepositoryInterface $roleRepositoryInterface)
    {
        $this->roleRepositoryInterface = $roleRepositoryInterface;
    }

    public function index(): JsonResponse
    {
        $data = $this->roleRepositoryInterface->index();

        return ApiResponseClass::sendResponse(UserResource::collection($data), '', 200);
    }

    public static function middleware(): array
    {
        return [
            'auth',
            new Middleware('permission:create-role|edit-role|delete-role', ['only' => ['index', 'show']]),
            new Middleware('permission:create-role', ['only' => ['create', 'store']]),
            new Middleware('permission:edit-role', ['only' => ['edit', 'update']]),
            new Middleware('permission:delete-role', ['only' => ['destroy']]),
        ];
    }
}
