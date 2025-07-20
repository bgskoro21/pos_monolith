<?php

namespace App\Services;

use App\Interfaces\Repositories\TenantRepositoryInterface;
use App\Interfaces\Services\TenantServiceInterface;

class TenantService implements TenantServiceInterface
{
    protected $tenantRepository;

    public function __construct(TenantRepositoryInterface $tenantRepository)
    {
        $this->tenantRepository = $tenantRepository;
    }

    public function tenantById(string $tenantId)
    {
        return $this->tenantRepository->tenantById($tenantId);
    }
}