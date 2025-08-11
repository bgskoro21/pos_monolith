<?php

namespace App\Models;

use App\Traits\Searchable;
use App\Traits\Slugable;
use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Database\Concerns\BelongsToTenant;

class ProductCategory extends Model
{
    use Searchable, Slugable, BelongsToTenant; 

    protected $guarded = ['id'];

    protected $searchable = [
        'columns' => ['name', 'description'],
    ];
}
