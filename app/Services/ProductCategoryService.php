<?php

namespace App\Services;

use App\DTOs\PaginationFilterDTO;
use App\DTOs\ProductCategoryDTO;
use App\Interfaces\Repositories\ProductCategoryRepositoryInterface;
use App\Interfaces\Services\ProductCategoryServiceInterface;
use App\Models\ProductCategory;

class ProductCategoryService implements ProductCategoryServiceInterface
{
    public function __construct(
        protected readonly ProductCategoryRepositoryInterface $productCategoryRepository
    )
    {}

    public function getAll()
    {
        return $this->productCategoryRepository->getAll();
    }

    public function getPaginated(PaginationFilterDTO $paginationFilter)
    {
        return $this->productCategoryRepository->getPaginated($paginationFilter->limit, $paginationFilter->keyword, $paginationFilter->sortField, $paginationFilter->sortDirection);
    }

    public function store(ProductCategoryDTO $data)
    {
        return $this->productCategoryRepository->create($data->toArray());
    }

    public function update(ProductCategory $category, ProductCategoryDTO $data)
    {
        return $this->productCategoryRepository->update($category, $data->toArray());
    }

    public function destroy(ProductCategory $category)
    {
        return $this->productCategoryRepository->destroy($category);
    }
}