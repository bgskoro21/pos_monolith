<?php

namespace App\Traits;
use Illuminate\Support\Str;

trait Slugable
{
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