<?php

namespace App\Services;

use App\Interfaces\Repositories\RoleRepositoryInterface;
use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Interfaces\Services\UserServiceInterface;
use App\Models\User;
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
        // Handle password
        if (!empty($data['password'])) 
        {
            $data['password'] = Hash::make($data['password']);
        } else 
        {
            unset($data['password']);
        }

        // Handle username
        if (isset($data['email'])) {
            $data['username'] = $data['username'] ?? Str::before($data['email'], '@');
        }

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

    public function update(User $user, array $data): User
    {
        $roles = $data['roles'] ?? null;
        unset($data['roles']);

        $data = $this->prepareUserData($data);

        $this->userRepository->update($user, $data);

        if (!empty($roles)) 
        {
            $user->syncRoles($roles);
        }

        return $user->refresh();
    }
}