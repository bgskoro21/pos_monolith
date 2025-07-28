<?php

namespace App\Interfaces\Repositories;

interface UserRepositoryInterface
{
    public function register(array $data);
    public function getPaginatedUsers(int $limit, ?string $keyword, ?string $sortField, ?string $sortDirection);
    public function store(array $data);
}