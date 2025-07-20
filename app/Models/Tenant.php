<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Stancl\Tenancy\Contracts\TenantWithDatabase;
use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Illuminate\Support\Str;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase;

    public $incrementing = false;
    protected $keyType = 'string';

    public static function getCustomColumns(): array
    {
        return [
            'id',
            'name',
            'slug'
        ];
    }

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
