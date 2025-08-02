<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Searchable
{
    public function scopeSearch(Builder $query, ?string $keyword): Builder
    {
        return $query
                ->when($keyword && property_exists($this, 'searchable'), function($query) use ($keyword)
                {
                    $columns = $this->searchable['columns'] ?? [];
                    $relations = $this->searchable['relations'] ?? [];

                    $keywords = explode(' ', trim($keyword));

                    foreach($keywords as $word)
                    {
                        $query->where(function ($q) use ($word, $columns, $relations)
                        {
                            collect($columns)->each(fn($column) => $q->orWhere($column, 'like', "%{$word}%"));

                            foreach ($relations as $relation => $relColumns) 
                            {
                                $q->orWhereHas($relation, function ($relQuery) use ($relColumns, $word) 
                                {
                                    collect($relColumns)->each(fn($col) => $relQuery->where($col, 'like', "%{$word}%"));
                                });
                            }
                        });
                    }
                });
    }
}