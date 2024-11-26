<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

interface IUserResource
{
    public function toArray(Request $request): array;
}
