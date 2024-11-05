<?php

namespace App\Services\user;

use App\Services\user\DTO\UserDto;

;

interface IUserService
{

    function create(UserDto $userDto);

    public function getUserById(int $id): object;

}
