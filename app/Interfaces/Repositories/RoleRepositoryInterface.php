<?php

namespace App\Interfaces\Repositories;

interface RoleRepositoryInterface
{
    public function getAll();
    public function getRolesNameByIds(array $roleIds): array;
}