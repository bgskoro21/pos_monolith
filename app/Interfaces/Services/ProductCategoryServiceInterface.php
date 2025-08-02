<?php

namespace App\Interfaces\Services;

interface ProductCategoryServiceInterface
{
    public function getAll();
    public function getPaginated(array $filters);
    public function create(array $data);
}