<?php

namespace App\Providers;

use App\Interfaces\Repositories\TenantRepositoryInterface;
use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Interfaces\Services\TenantServiceInterface;
use App\Interfaces\Services\UserServiceInterface;
use App\Repositories\TenantRepository;
use App\Repositories\UserRepository;
use App\Services\TenantService;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);
        $this->app->bind(TenantRepositoryInterface::class, TenantRepository::class);
        $this->app->bind(TenantServiceInterface::class, TenantService::class);
    }
}
