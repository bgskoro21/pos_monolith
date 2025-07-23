<?php 

namespace App\Interfaces\Services;

interface UserServiceInterface
{
    public function create(array $data);
    public function getPaginatedUsers(array $filters);
}