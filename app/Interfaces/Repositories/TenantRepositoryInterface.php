<?php 

namespace App\Interfaces\Repositories;

interface TenantRepositoryInterface
{
    public function tenantById(string $tenantId);
}