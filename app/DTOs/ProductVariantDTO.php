<?php

namespace App\DTOs;

class ProductVariantDTO
{
    public function __construct(
        public readonly ?string $sku,
        public readonly float $price,
        public readonly int $stock,
        public readonly array $options = [] // contoh: [['name' => 'Warna', 'value' => 'Merah']]
    ) {}

    /**
     * Factory method untuk buat DTO dari array
     */
    public static function fromArray(array $data): self
    {
        return new self(
            sku: $data['sku'] ?? null,
            price: (float) $data['price'],
            stock: (int) $data['stock'],
            options: $data['options'] ?? []
        );
    }
}
