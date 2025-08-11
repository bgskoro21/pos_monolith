<?php

namespace App\Http\Controllers\Products;

use App\DTOs\ProductDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreProductRequest;
use App\Interfaces\Services\ProductServiceInterface;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        protected readonly ProductServiceInterface $productService
    ){}

    public function store(StoreProductRequest $request)
    {
        $productDto = ProductDTO::fromArray($request->validated());

        $this->productService->create($productDto);

        return redirect()->route('products.index');
    }
}
