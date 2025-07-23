<?php

namespace App\Interfaces\Repositories;

interface UserRepositoryInterface
{
    public function create(array $data);
    public function getPaginatedUsers(int $limit, ?string $keyword, ?string $sortField, ?string $sortDirection);
}