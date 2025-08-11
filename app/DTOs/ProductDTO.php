<?php

namespace App\DTOs;

class ProductDTO
{
    public function __construct(
        public readonly int $productCategoryId,
        public readonly string $name,
        public readonly string $slug,
        public readonly ?string $description,
        public readonly ?float $basePrice,
        public readonly int $stock,
        public readonly ?string $sku,
        public readonly bool $hasVariant,
        public readonly array $variants = []
    ){}

    public static function fromArray(array $data): self
    {
        return new self(
            productCategoryId: $data['product_category_id'],
            name: $data['name'],
            slug: $data['slug'],
            description: $data['description'] ?? null,
            basePrice: isset($data['base_price']) ? (float) $data['base_price'] : null,
            stock: $data['stock'] ?? 0,
            sku: $data['sku'] ?? null,
            hasVariant: $data['has_variant'] ?? false,
            variants: $data['variants'] ?? []
        );
    }
}