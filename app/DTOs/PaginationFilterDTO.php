<?php

namespace App\DTOs;

class PaginationFilterDTO
{
    public function __construct(
        public readonly int $limit = 10,
        public readonly ?string $keyword = null,
        public readonly string $sortField = 'name',
        public readonly string $sortDirection = 'asc',
    )
    {}

    public static function fromArray(array $filters): self
    {
        return new self(
            limit: (int)($filters['limit'] ?? 10),
            keyword: $filters['keyword'] ?? null,
            sortField: $filters['sort'] ?? 'name',
            sortDirection: $filters['direction'] ?? 'asc'
        );
    }
}