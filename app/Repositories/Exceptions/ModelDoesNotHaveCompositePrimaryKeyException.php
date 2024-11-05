<?php declare(strict_types = 1);

namespace App\Repositories\Exceptions;

final class ModelDoesNotHaveCompositePrimaryKeyException extends \RuntimeException
{
    /**
     * ModelDoesNotHaveCompositePrimaryKeyException constructor.
     * @param string $model
     */
    public function __construct(string $model)
    {
        $message = sprintf(
            'Model `%s` does not have composite primary key. Please provide scalar value for id',
            $model
        );
        parent::__construct($message);
    }
}
