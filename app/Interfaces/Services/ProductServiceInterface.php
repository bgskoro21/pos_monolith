<?php

namespace App\Interfaces\Services;

use App\DTOs\ProductDTO;

interface ProductServiceInterface
{
    public function create(ProductDTO $dto);
}