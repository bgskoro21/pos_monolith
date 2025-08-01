<?php 

namespace App\Interfaces\Services;

use App\Models\User;

interface UserServiceInterface
{
    public function register(array $data);
    public function getPaginatedUsers(array $filters);
    public function store(array $data);
    public function update(User $user, array $data);
    public function destroy(User $user): bool;
    public function bulkDelete(array $ids);
}