<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class ProductVariant extends Model
{
    protected $guarded = ['id'];

    public function options()
    {
        return $this->hasMany(ProductVariantOption::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
