<?php

namespace App\Repositories;

use App\Interfaces\Repositories\TenantRepositoryInterface;
use App\Models\Tenant;

class TenantRepository implements TenantRepositoryInterface
{
    public function tenantById(string $tenantId)
    {
        return Tenant::find($tenantId);
    }
}