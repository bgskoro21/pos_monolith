<?php

namespace App\Http\Middleware;

use App\Interfaces\Services\TenantServiceInterface;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class InitializeTenancyFromSession
{
    protected $tenantService;

    public function __construct(TenantServiceInterface $tenantService)
    {
        $this->tenantService = $tenantService;
    }

    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user() && Auth::user()->tenant_id)
        {
            $tenant = $this->tenantService->tenantById(Auth::user()->tenant_id);

            tenancy()->initialize($tenant);
        }

        return $next($request);
    }
}
