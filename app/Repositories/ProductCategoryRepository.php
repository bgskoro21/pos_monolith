<?php

use App\Interfaces\Repositories\ProductCategoryRepositoryInterface;
use App\Models\ProductCategory;

class ProductCategoryRepository implements ProductCategoryRepositoryInterface
{
    public function getAll()
    {
        return ProductCategory::all();
    }

    public function getPaginated(int $limit, ?string $keyword, ?string $sortField = 'name', ?string $sortDirection = 'asc')
    {
        $query = ProductCategory::query();

        $allowedSortFields = ['name', 'description', 'created_at'];

        if(in_array($sortField, $allowedSortFields))
        {
            $query->orderBy($sortField, $allowedSortFields);
        }

        return $query->search($keyword)->paginate($limit);
    }

    public function create(array $data)
    {
        return ProductCategory::create($data);
    }
}