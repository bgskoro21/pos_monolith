<?php

namespace App\Interfaces\Repositories;

use App\Models\User;

interface UserRepositoryInterface
{
    public function register(array $data);
    public function getPaginatedUsers(int $limit, ?string $keyword, ?string $sortField, ?string $sortDirection);
    public function getByIds(array $ids);
    public function store(array $data) : User;
    public function update(User $user, array $data): User;
    public function destroy(User $user): bool;
    public function bulkDelete(array $userIds);
}