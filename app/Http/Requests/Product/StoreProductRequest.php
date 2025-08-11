<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_id'        => ['required', 'exists:product_categories,id'],
            'name'               => ['required', 'string', 'max:255'],
            'slug'               => ['nullable', 'string', 'max:255', 'unique:products,slug'],
            'description'        => ['nullable', 'string'],
            'price'              => ['required', 'numeric', 'min:0'],
            'stock'              => ['nullable', 'integer', 'min:0'],

            // Validasi untuk product variants
            'variants'           => ['nullable', 'array'],
            'variants.*.name'    => ['required_with:variants', 'string', 'max:255'],
            'variants.*.price'   => ['nullable', 'numeric', 'min:0'],
            'variants.*.stock'   => ['nullable', 'integer', 'min:0'],

            // Validasi untuk variant options
            'variants.*.options'                => ['nullable', 'array'],
            'variants.*.options.*.name'         => ['required_with:variants.*.options', 'string', 'max:255'],
            'variants.*.options.*.value'        => ['required_with:variants.*.options', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required'      => 'Kategori produk wajib dipilih.',
            'category_id.exists'        => 'Kategori yang dipilih tidak ditemukan.',
            'name.required'             => 'Nama produk wajib diisi.',
            'price.required'            => 'Harga produk wajib diisi.',
            'price.numeric'             => 'Harga produk harus berupa angka.',

            'variants.*.name.required_with'   => 'Nama varian wajib diisi jika varian ditambahkan.',
            'variants.*.options.*.name.required_with'  => 'Nama opsi varian wajib diisi.',
            'variants.*.options.*.value.required_with' => 'Nilai opsi varian wajib diisi.',
        ];
    }
}
