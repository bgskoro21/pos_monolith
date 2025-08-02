<?php 

namespace App\Interfaces\Repositories;

interface ProductCategoryRepositoryInterface
{
    public function getAll();
    public function getPaginated(int $limit, ?string $keyword, ?string $sortField, ?string $sortDirection);
    public function create(array $data);
}