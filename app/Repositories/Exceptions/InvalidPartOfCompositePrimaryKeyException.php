<?php declare(strict_types = 1);

namespace App\Repositories\Exceptions;

final class InvalidPartOfCompositePrimaryKeyException extends \RuntimeException
{
    /**
     * InvalidPartOfCompositePrimaryKeyException constructor.
     * @param string $model
     * @param string $invalidKey
     * @param array<string> $keys
     */
    public function __construct(string $model, string $invalidKey, array $keys)
    {
        $message = sprintf(
            'Invalid part of composite primary key: `%s` for model `%s`. Allowed parts: %s',
            $invalidKey,
            $model,
            implode(',', $keys)
        );
        parent::__construct($message);
    }
}
