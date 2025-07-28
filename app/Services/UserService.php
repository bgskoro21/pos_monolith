<?php

namespace App\Services;

use App\Interfaces\Repositories\RoleRepositoryInterface;
use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Interfaces\Services\UserServiceInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService implements UserServiceInterface
{
    public function __construct(
        protected readonly UserRepositoryInterface $userRepository,
        protected readonly RoleRepositoryInterface $roleRepository
    ){}

    private function prepareUserData(array $data): array
    {
        $data['password'] = Hash::make($data['password']);
        $data['username'] = $data['username'] ?? Str::before($data['email'], '@');

        return $data;
    }

    public function register(array $data)
    {
        return $this->userRepository->register($this->prepareUserData($data));
    }

    public function getPaginatedUsers(array $filters)
    {
        $limit = $filters['limit'] ?? 10;
        $keyword = $filters['keyword'] ?? null;
        $sortField = $filters['sort'] ?? 'name';
        $sortDirection = $filters['direction'] ?? 'asc';

        return $this->userRepository->getPaginatedUsers($limit, $keyword, $sortField, $sortDirection);
    }

    public function store(array $data)
    {
        $roles = $data['roles'] ?? [];
        unset($data['roles']);

        $user = $this->userRepository->store($this->prepareUserData($data));

        if(!empty($roles))
        {
            $roleNames = $this->roleRepository->getRolesNameByIds($roles);
            $user->syncRoles($roleNames);
        }

        return $user;
    }
}