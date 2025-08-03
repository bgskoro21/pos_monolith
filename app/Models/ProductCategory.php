<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use Searchable; 
    
    protected $guarded = ['id'];

    protected $searchable = [
        'columns' => ['name', 'email'],
        'relations' => ['roles' => ['name']]
    ];
}
