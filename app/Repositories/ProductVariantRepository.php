<?php

namespace App\Repositories;

use App\Interfaces\Repositories\ProductVariantRepositoryInterface;
use App\Models\ProductVariant;

class ProductVariantRepository implements ProductVariantRepositoryInterface
{
    public function create(array $data)
    {
        return ProductVariant::create($data);
    }
}