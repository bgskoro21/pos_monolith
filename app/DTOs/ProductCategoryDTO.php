<?php

namespace App\DTOs;

class ProductCategoryDTO
{
    public function __construct(
        protected readonly string $name,
        protected readonly string $description
    )
    {}

    public function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            description: $data['description']
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description
        ];
    }
}