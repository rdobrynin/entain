<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\TodoRepositoryInterface;
use App\Models\Todo;

class TodoRepository implements TodoRepositoryInterface
{
    public function index()
    {

//        if (auth()->user()->hasRole('Admin')) {
//            return Todo::all();
//        }
        return Todo::all();
//        return Todo::all()->where('user_id', auth()->id());
    }

    public function getById($id)
    {
        return Todo::findOrFail($id);
    }

    public function store(array $data)
    {
        $result = new Todo;
        $result->text = $data['text'];
        $result->user()->associate($data['user']);
        $result->save();

        return $result;
    }

    public function update(array $data, $id)
    {
        return Todo::whereId($id)->update($data);
    }

    public function delete($id)
    {
        Todo::destroy($id);
    }
}
