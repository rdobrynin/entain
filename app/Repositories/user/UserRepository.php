<?php

namespace App\Repositories\user;

use App\Models\User;
use App\Repositories\AbstractEloquentRepository;

class UserRepository extends AbstractEloquentRepository
{

    /**
     * User constructor.
     * @param User $model
     */
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * @param string $email
     * @param string[] $columns
     *
     * @return bool
     */
    public function isExistByEmail(string $email, array $columns = ['*']): bool
    {
        return (bool)User::where('email', $email)->first();
    }

}
