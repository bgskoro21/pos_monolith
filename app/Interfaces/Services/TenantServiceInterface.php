<?php

namespace App\Interfaces\Services;

interface TenantServiceInterface
{
    public function tenantById(string $tenantId);
}