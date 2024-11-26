<?php
declare(strict_types=1);
namespace App\Providers;

use App\Interfaces\Interfaces\TodoRepositoryInterface;
use App\Repositories\TodoRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(TodoRepositoryInterface::class,TodoRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
