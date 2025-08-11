<?php

namespace App\Services;

use App\DTOs\ProductDTO;
use App\DTOs\ProductVariantDTO;
use App\Interfaces\Repositories\ProductRepositoryInterface;
use App\Interfaces\Repositories\ProductVariantOptionInterface;
use App\Interfaces\Repositories\ProductVariantRepositoryInterface;
use App\Interfaces\Services\ProductServiceInterface;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductService implements ProductServiceInterface
{
    public function __construct(
        protected readonly ProductRepositoryInterface $productRepository,
        protected readonly ProductVariantRepositoryInterface $productVariantRepository,
        protected readonly ProductVariantOptionInterface $productVariantOptionRepository,
    ){}

    public function create(ProductDTO $dto): Product
    {
        return DB::transaction(function () use ($dto) {
            // 1️⃣ Create main product
            $product = $this->productRepository->create([
                'product_category_id' => $dto->productCategoryId,
                'name' => $dto->name,
                'slug' => $dto->slug,
                'description' => $dto->description,
                'base_price' => $dto->basePrice,
                'stock' => $dto->stock,
                'sku' => $dto->sku,
                'has_variant' => $dto->hasVariant,
            ]);

            // 2️⃣ If product has variants
            if ($dto->hasVariant && !empty($dto->variants)) 
            {
                foreach ($dto->variants as $variantData) 
                {
                    // Convert array → DTO
                    $variantDTO = ProductVariantDTO::fromArray($variantData);

                    // 3️⃣ Create variant
                    $variantModel = $this->productVariantRepository->create([
                        'product_id' => $product->id,
                        'sku' => $variantDTO->sku,
                        'price' => $variantDTO->price,
                        'stock' => $variantDTO->stock,
                    ]);

                    // 4️⃣ Create variant options (if any)
                    if (!empty($variantDTO->options)) 
                    {
                        $this->productVariantOptionRepository->bulkCreate($variantModel->id, $variantDTO->options);
                    }
                }
            }

            return $product->load('variants.options');
        });
    }
}