<?php

namespace App\Interfaces\Services;

use App\DTOs\PaginationFilterDTO;

interface ProductCategoryServiceInterface
{
    public function getAll();
    public function getPaginated(PaginationFilterDTO $pagination);
    public function store(array $data);
}