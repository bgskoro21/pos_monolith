<?php

namespace App\Interfaces\Repositories;

interface ProductVariantOptionInterface
{
    public function create(array $data);
    public function bulkCreate(int $variantId, array $data);
}