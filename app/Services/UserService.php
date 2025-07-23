<?php

namespace App\Services;

use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Interfaces\Services\UserServiceInterface;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function create(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        $data['username'] = explode('@', $data['email'])[0];

        return $this->userRepository->create($data);
    }

    public function getPaginatedUsers(array $filters)
    {
        $limit = $filters['limit'] ?? 10;
        $keyword = $filters['keyword'] ?? null;
        $sortField = $filters['sort'] ?? 'name';
        $sortDirection = $filters['direction'] ?? 'asc';

        return $this->userRepository->getPaginatedUsers($limit, $keyword, $sortField, $sortDirection);
    }
}