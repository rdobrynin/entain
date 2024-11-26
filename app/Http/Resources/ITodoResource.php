<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

interface ITodoResource
{
    public function toArray(Request $request): array;
}
