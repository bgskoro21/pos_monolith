<?php 

namespace App\Interfaces\Services;

use App\DTOs\PaginationFilterDTO;
use App\DTOs\UserDTO;
use App\Models\User;

interface UserServiceInterface
{
    public function register(array $data);
    public function getPaginated(PaginationFilterDTO $paginationFilter);
    public function store(UserDTO $data);
    public function update(User $user, UserDTO $data);
    public function destroy(User $user): bool;
    public function bulkDelete(array $ids);
}