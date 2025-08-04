<?php

namespace App\Models;

use App\Traits\Searchable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProductCategory extends Model
{
    use Searchable; 

    protected $guarded = ['id'];

    protected $searchable = [
        'columns' => ['name', 'description'],
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) 
        {
            if(empty($model->slug))
            {
                $model->slug = Str::slug($model->name);
            }
        });
    }
}
