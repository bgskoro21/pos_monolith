<?php

namespace App\Interfaces\Services;

use App\DTOs\PaginationFilterDTO;
use App\DTOs\ProductCategoryDTO;

interface ProductCategoryServiceInterface
{
    public function getAll();
    public function getPaginated(PaginationFilterDTO $pagination);
    public function store(ProductCategoryDTO $data);
}