<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Config;
use Watson\Rememberable\Rememberable;

/**
 * @method static Builder|\Illuminate\Database\Query\Builder select($columns = ['*'])
 * @method static \Watson\Rememberable\Query\Builder where($column, $operator = null, $value = null, $boolean = 'and')
 * @method static \Watson\Rememberable\Query\Builder whereIn($column, $values, $boolean = 'and', $not = false)
 */
abstract class AbstractModel extends Model
{
    use Rememberable;

    /**
     * @var array will be outputted in rest api
     */
    public $restApiPublicFields = [];

    public static function multiInsertGetIds(array $values): array
    {
        $originalValues = $values;

        // create Eloquent models from attributes, without ID yet
        $insertedModels = [];
        foreach ($originalValues as $attributes) {
            /** @psalm-suppress UnsafeInstantiation */
            $model = new static($attributes);
            $insertedModels[] = $model;
        }
        $queryBuilder = static::query()->getQuery();

        // Since every insert gets treated like a batch insert, we will make sure the
        // bindings are structured in a way that is convenient for building these
        // inserts statements by verifying the elements are actually an array.
        if (! is_array(reset($values))) {
            $values = [$values];
        }

        // Since every insert gets treated like a batch insert, we will make sure the
        // bindings are structured in a way that is convenient for building these
        // inserts statements by verifying the elements are actually an array.
        else {
            foreach ($values as $key => $value) {
                ksort($value);
                $values[$key] = $value;
            }
        }

        // We'll treat every insert like a batch insert so we can easily insert each
        // of the records into the database consistently. This will make it much
        // easier on the grammars to just handle one type of record insertion.
        $bindings = [];

        foreach ($values as $record) {
            foreach ($record as $value) {
                $bindings[] = $value;
            }
        }

        $compiledInsertSql = $queryBuilder->getGrammar()->compileInsert($queryBuilder, $values);

        // important for POSTGRESQL to get IDs after insert
        $compiledInsertSql .= ' returning id';

        // returns array of objects where each property 'id' -> number
        $result = $queryBuilder->getConnection()->select($compiledInsertSql, $bindings);

        // set 'id' attribute to each Eloquent model and fire 'saved' and 'created' events
        // events are needed for UserTransaction model, otherwise wallet ledger
        // won't show any new record, because they are pulled from cache.
        // That cache is added in 'created' event
        $currentTimestamp = new Carbon; // make sure to add created_at and updated_at
        foreach ($insertedModels as $key => $model) {
            $model->setAttribute('updated_at', $currentTimestamp);
            $model->setAttribute('created_at', $currentTimestamp);
            $model->setAttribute('id', $result[$key]->id);
            $model->fireModelEvent('saved', false);
            $model->fireModelEvent('created', false);
            $model->syncOriginal();
        }

        return $insertedModels;
    }

    /**
     * Clear sensitive fields like as email, password and etc
     *
     * @return array
     */
    public function getNonSensitiveFields()
    {
        $data = $this->getAttributes();
        $data = array_diff_key($data, array_fill_keys(Config::get('app.sensitive_attributes'), ''));

        return $data;
    }

    public static function readOnly(): Builder
    {
        return static::on('pgsql_read')->getModel();
    }

    public function isSoftDeletable(): bool
    {
        $traits = class_uses_recursive($this);

        return \in_array(SoftDeletes::class, $traits, true);
    }
}
