<?php declare(strict_types = 1);

namespace App\Repositories;

use App\Repositories\Exceptions\InvalidPartOfCompositePrimaryKeyException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Interface RepositoryInterface
 * @package App\Repositories
 */
interface RepositoryInterface
{
    /**
     * @param mixed $id
     * @param bool $lock
     * @return Model|null
     */
    public function find($id, bool $lock = false): ?Model;

    /**
     * @param mixed $id
     * @param bool $lock
     * @return Model
     * @throws ModelNotFoundException
     * @throws InvalidPartOfCompositePrimaryKeyException
     */
    public function get($id, bool $lock = false): Model;

    /**
     * @param Model $model
     * @return Model
     */
    public function save(Model $model): Model;

    /**
     * @param Collection $collection
     * @return bool
     */
    public function saveMany(Collection $collection): bool;

    /**
     * @param Model $model
     * @return bool
     * @throws \Exception
     */
    public function delete(Model $model): bool;
}
