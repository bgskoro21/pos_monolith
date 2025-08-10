<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class Product extends Model
{
    use BelongsToTenant;

    protected $guarded = ['id'];

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
}
