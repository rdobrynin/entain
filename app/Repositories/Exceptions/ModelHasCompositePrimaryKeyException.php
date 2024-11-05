<?php declare(strict_types = 1);

namespace App\Repositories\Exceptions;

final class ModelHasCompositePrimaryKeyException extends \RuntimeException
{
    /**
     * ModelHasCompositePrimaryKeyException constructor.
     * @param string $modelName
     * @param array<string> $keys
     */
    public function __construct(string $modelName, array $keys)
    {
        $message = sprintf(
            'Model `%s` has composite primary key. Please provide array with keys: %s as id',
            $modelName,
            implode(', ', $keys)
        );
        parent::__construct($message);
    }
}
