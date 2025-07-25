<?php

namespace App\Repositories;

use App\Interfaces\Repositories\UserRepositoryInterface;
use App\Models\Tenant;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserRepository implements UserRepositoryInterface{
    public function create(array $data)
    {
        try
        {
            Log::info("Try to insert data: ", $data);
            DB::beginTransaction();

            $tenant = Tenant::create([
                'name' => $data['company_name']
            ]);

            tenancy()->initialize($tenant);

            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'username' => $data['username'],
                'password' => $data['password']
            ]);

            $user->assignRole('superadmin');

            DB::commit();

            return $user;
        }
        catch(Exception $e)
        {
            DB::rollBack();
            Log::error("Tenant creation failed: ". $e->getMessage());
            throw $e;
        }
        finally
        {
            tenancy()->end();
        }
    }

    public function getPaginatedUsers(int $limit, ?string $keyword, ?string $sortField = 'name', ?string $sortDirection = 'asc')
    {
        $query = User::query();

        if(!empty($keyword))
        {
            $query->where(function ($q) use ($keyword){
                $q->where('name', 'like', "%{$keyword}%")
                  ->orWhere('email', 'like', "%{$keyword}%");
            });
        }

        $allowedSortFields = ['name', 'email', 'created_at'];
        
        if(in_array($sortField, $allowedSortFields))
        {
            $query->orderBy($sortField, $sortDirection);
        }

        return $query->paginate($limit);
    }
}
