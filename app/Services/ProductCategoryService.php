<?php

namespace App\Services;

use App\DTOs\PaginationFilterDTO;
use App\Interfaces\Repositories\ProductCategoryRepositoryInterface;
use App\Interfaces\Services\ProductCategoryServiceInterface;

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

    public function store(array $data)
    {
        return $this->productCategoryRepository->create($data);
    }
}