<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Classes\ApiResponseClass;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoResource;
use App\Interfaces\Interfaces\TodoRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TodoController extends Controller
{
    private TodoRepositoryInterface $todoRepositoryInterface;

    public function __construct(TodoRepositoryInterface $todoRepositoryInterface)
    {
        $this->todoRepositoryInterface = $todoRepositoryInterface;
        $this->middleware('auth');
        $this->middleware('permission:view-product|create-product|edit-product|delete-product', ['only' => ['index', 'show']]);
        $this->middleware('permission:create-product', ['only' => ['create', 'store']]);
        $this->middleware('permission:edit-product', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete-product', ['only' => ['destroy']]);
    }

    public function index(): JsonResponse
    {
        $data = $this->todoRepositoryInterface->index();

        return ApiResponseClass::sendResponse(TodoResource::collection($data), '', 200);
    }

    public function store(StoreTodoRequest $request): ?JsonResponse
    {

        $details = [
            'text' => $request->text,
            'user' => Auth::user(),
        ];
        DB::beginTransaction();
        try {
            $data = $this->todoRepositoryInterface->store($details);
            DB::commit();

            return ApiResponseClass::sendResponse(new TodoResource($data), 'Todo Create Successful', 201);

        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    public function show($id): JsonResponse
    {
        $data = $this->todoRepositoryInterface->getById($id);

        return ApiResponseClass::sendResponse(new TodoResource($data), '', 200);
    }

    public function update(UpdateTodoRequest $request, $id): JsonResponse
    {
        $updateDetails = [
            'text' => $request->text,
            'is_completed' => $request->is_completed,
        ];
        DB::beginTransaction();
        try {
            $this->todoRepositoryInterface->update($updateDetails, $id);

            DB::commit();

            return ApiResponseClass::sendResponse('Todo Update Successful', '', 201);

        } catch (\Exception $ex) {
            return ApiResponseClass::rollback($ex);
        }
    }

    public function destroy($id): JsonResponse
    {
        $this->todoRepositoryInterface->delete($id);

        return ApiResponseClass::sendResponse('Todo Delete Successful', '', 204);
    }
}
