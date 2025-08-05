<?php

namespace App\Http\Controllers\Products;

use App\DTOs\PaginationFilterDTO;
use App\DTOs\ProductCategoryDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductCategoryRequest;
use App\Http\Requests\User\BulkDeleteUserRequest;
use App\Interfaces\Services\ProductCategoryServiceInterface;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    public function __construct(
       protected readonly ProductCategoryServiceInterface $productCategoryService
    )
    {}

    public function index(Request $request)
    {
        $pagination = PaginationFilterDTO::fromArray($request->all());
        $categories = $this->productCategoryService->getPaginated($pagination);

        return Inertia::render('categories/index', [
            "categories" => $categories,
            "filters" => $request->all(),
        ]);
    }

    public function store(StoreProductCategoryRequest $request)
    {
        $categoryDto = ProductCategoryDTO::fromArray($request->validated());

        $this->productCategoryService->store($categoryDto);

        return redirect()->route('categories.index');
    }

    public function update(ProductCategory $category, StoreProductCategoryRequest $request)
    {
        $categoryDto = ProductCategoryDTO::fromArray($request->validated());

        $this->productCategoryService->update($category, $categoryDto);

        return redirect()->route("categories.index");
    }

    public function destroy(ProductCategory $category)
    {
        $this->productCategoryService->destroy($category);

        return redirect()->route("categories.index");
    }

    public function bulkDelete(BulkDeleteUserRequest $request)
    {
        $this->productCategoryService->destroy($request->validated());

        return redirect()->route("categories.index");
    }
}
