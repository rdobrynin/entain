<?php declare(strict_types = 1);

namespace App\Repositories\Exceptions;

class NotCompletedCompositePrimaryKeyException extends \RuntimeException
{
    /**
     * NotCompletedCompositePrimaryKeyException constructor.
     * @param string $model
     * @param array<string> $keys
     */
    public function __construct(string $model, array $keys)
    {
        $message = sprintf(
            'Not completed composite primary key for model `%s`. Expected all keys: [%s].',
            $model,
            implode(', ', $keys)
        );
        parent::__construct($message);
    }
}
