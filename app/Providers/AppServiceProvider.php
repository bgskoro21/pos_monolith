<?php

namespace App\Providers;

use App\Interfaces\Repositories\ProductCategoryRepositoryInterface;
use App\Interfaces\Repositories\RoleRepositoryInterface;
use App\Interfaces\Repositories\TenantRepositoryInterface;
use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Interfaces\Services\ProductCategoryServiceInterface;
use App\Interfaces\Services\RoleServiceInterface;
use App\Interfaces\Services\TenantServiceInterface;
use App\Interfaces\Services\UserServiceInterface;
use App\Repositories\ProductCategoryRepository;
use App\Repositories\RoleRepository;
use App\Repositories\TenantRepository;
use App\Repositories\UserRepository;
use App\Services\ProductCategoryService;
use App\Services\RoleService;
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
        // User
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);

        // Tenant
        $this->app->bind(TenantRepositoryInterface::class, TenantRepository::class);
        $this->app->bind(TenantServiceInterface::class, TenantService::class);

        // Role
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(RoleServiceInterface::class, RoleService::class);

        // Product Category
        $this->app->bind(ProductCategoryRepositoryInterface::class, ProductCategoryRepository::class);
        $this->app->bind(ProductCategoryServiceInterface::class, ProductCategoryService::class);
    }
}
