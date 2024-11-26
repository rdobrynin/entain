<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Todo;
use App\Http\Resources\TodoResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
class TodoController extends BaseController
{
    public function index(): JsonResponse
    {
        $todos = Todo::all();

        return $this->sendResponse(TodoResource::collection($todos), 'Todos retrieved successfully.');
    }

    public function store(Request $request): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [

            'text' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $todo = Todo::create($input);

        return $this->sendResponse(new TodoResource($todo), 'Todo created successfully.');
    }

    public function show($id): JsonResponse
    {
        $todo = Todo::find($id);

        if (is_null($todo)) {
            return $this->sendError('Todo not found.');
        }

        return $this->sendResponse(new TodoResource($todo), 'Todo retrieved successfully.');
    }

    public function update(Request $request, Todo $todo): JsonResponse
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'text' => 'required',
            'is_completed' => 'required'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $todo->text = $input['text'];
        $todo->is_completed = $input['is_completed'];
        $todo->save();

        return $this->sendResponse(new TodoResource($todo), 'Todo updated successfully.');
    }

    public function destroy(Todo $todo): JsonResponse
    {
        $todo->delete();

        return $this->sendResponse([], 'Todo deleted successfully.');
    }
}
