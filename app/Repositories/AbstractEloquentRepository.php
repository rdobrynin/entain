<?php declare(strict_types = 1);

namespace App\Repositories;

use App\Repositories\Exceptions\InvalidPartOfCompositePrimaryKeyException;
use App\Repositories\Exceptions\ModelDoesNotHaveCompositePrimaryKeyException;
use App\Repositories\Exceptions\ModelHasCompositePrimaryKeyException;
use App\Repositories\Exceptions\NotCompletedCompositePrimaryKeyException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

abstract class AbstractEloquentRepository implements RepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * EloquentRepository constructor.
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * @inheritdoc
     */
    public function find($id, bool $lock = false): ?Model
    {
        // check if model has composite primary key
        if (!is_array($id) && is_array($this->model->getKeyName())) {
            /** @var array $primaryKeys */
            $primaryKeys = $this->model->getKeyName();
            throw new ModelHasCompositePrimaryKeyException(get_class($this->model), $primaryKeys);
        }

        // check if model has simple primary key
        if (is_array($id) && !is_array($this->model->getKeyName())) {
            throw new ModelDoesNotHaveCompositePrimaryKeyException(get_class($this->model));
        }

        if (is_array($this->model->getKeyName())) {
            /** @var array<string> $primaryKeys */
            $primaryKeys = $this->model->getKeyName();

            // check if $id has index key type of string, ['id' => value, 'ref_id' => value]
            $filteredIds = array_filter(array_keys($id), static function ($v) {
                return is_string($v);
            });

            if (count($filteredIds) !== count(array_keys($id))) {
                throw new ModelHasCompositePrimaryKeyException(get_class($this->model), $primaryKeys);
            }

            // check if all index keys are part of composite key
            foreach (array_keys($id) as $key) {
                if (!in_array($key, $primaryKeys, true)) {
                    throw new InvalidPartOfCompositePrimaryKeyException(get_class($this->model), $key, $primaryKeys);
                }
            }

            if (count(array_keys($id)) !== count($primaryKeys)) {
                throw new NotCompletedCompositePrimaryKeyException(get_class($this->model), $primaryKeys);
            }

            $query = $this->newQuery();

            foreach ($primaryKeys as $primaryKey) {
                if (array_key_exists($primaryKey, $id)) {
                    $query->where($primaryKey, '=', $id[$primaryKey]);
                }
            }
        } else {
            $query = $this->newQuery()->where($this->model->getKeyName(), '=', $id);
        }

        if ($lock) {
            $query->lockForUpdate();
        }


        /** @var Model|null $model */
        $model = $query->first();

        return $model;
    }

    /**
     * @inheritdoc
     */
    public function get($id, bool $lock = false): Model
    {
        $model = $this->find($id, $lock);
        if ($model === null) {
            throw new ModelNotFoundException(sprintf(
                'Model `%s` not found with key: %s.',
                get_class($this->model),
                $this->primaryKeyToString($id)
            ));
        }

        return $model;
    }

    /**
     * @return Builder
     */
    protected function newQuery(): Builder
    {
        return $this->model->newQuery();
    }

    /**
     * @inheritdoc
     */
    public function save(Model $model): Model
    {
        $model->save();
        $model->refresh();

        return $model;
    }

    /**
     * @param Collection $items
     * @return bool
     */
    public function saveMany(Collection $items): bool
    {
        return $this->newQuery()->insert($items->toArray());
    }

    /**
     * @inheritdoc
     */
    public function delete(Model $model): bool
    {
        return $model->delete() ?? false;
    }

    /**
     * @return Collection
     */
    public function findAll(): Collection
    {
        return $this->newQuery()->get();
    }

    /**
     * @param mixed $id
     * @return string
     */
    private function primaryKeyToString($id): string
    {
        if (!is_array($id)) {
            $primaryKey = [$this->model->getKeyName() => $id];
        } else {
            $primaryKey = $id;
        }

        $normalizedKey = [];
        foreach ($primaryKey as $key => $value) {
            $normalizedKey[] = sprintf('%s: %s', $key, $value);
        }

        return sprintf('[%s]', implode(', ', $normalizedKey));
    }
}
