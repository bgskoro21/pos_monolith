<?php 

namespace App\Interfaces\Repositories;

use App\Models\ProductCategory;

interface ProductCategoryRepositoryInterface
{
    public function getAll();
    public function getPaginated(int $limit, ?string $keyword, ?string $sortField, ?string $sortDirection);
    public function create(array $data);
    public function update(ProductCategory $category, array $data);
    public function destroy(ProductCategory $category);
}