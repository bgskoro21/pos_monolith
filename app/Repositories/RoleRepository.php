<?php

namespace App\Repositories;

use App\Interfaces\Repositories\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepositoryInterface
{
    public function getAll()
    {
        return Role::all(['id', 'name']);
    }

    public function getRolesNameByIds(array $roleIds): array
    {
        return Role::whereIn('id', $roleIds)->pluck('name')->toArray();
    }
}