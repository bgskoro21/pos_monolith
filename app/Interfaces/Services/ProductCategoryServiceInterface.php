<?php

namespace App\Interfaces\Services;

use App\DTOs\PaginationFilterDTO;
use App\DTOs\ProductCategoryDTO;
use App\Models\ProductCategory;

interface ProductCategoryServiceInterface
{
    public function getAll();
    public function getPaginated(PaginationFilterDTO $pagination);
    public function store(ProductCategoryDTO $data);
    public function update(ProductCategory $category, ProductCategoryDTO $data);
    public function destroy(ProductCategory $category);
    public function bulkDelete(array $ids);
}