<?php

namespace App\Repositories;

use App\Interfaces\Repositories\ProductVariantOptionInterface;
use App\Models\ProductVariantOption;

class ProductVariantOptionRepository implements ProductVariantOptionInterface
{
    public function create(array $data): ProductVariantOption
    {
        return ProductVariantOption::create($data);
    }

    public function bulkCreate(int $variantId, array $options)
    {
        $data = array_map(function ($option) use ($variantId) {
            return [
                'product_variant_id' => $variantId,
                'name' => $option['name'],
                'value' => $option['value'],
            ];
        }, $options);

        return ProductVariantOption::insert($data);
    }
}