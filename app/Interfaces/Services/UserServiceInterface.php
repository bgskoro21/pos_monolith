<?php 

namespace App\Interfaces\Services;

interface UserServiceInterface
{
    public function register(array $data);
    public function getPaginatedUsers(array $filters);
    public function store(array $data);
}