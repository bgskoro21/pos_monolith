<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Interfaces\Services\RoleServiceInterface;
use App\Interfaces\Services\UserServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct
    (
        protected readonly UserServiceInterface $userService,
        protected readonly RoleServiceInterface $roleService,
    ){}

    public function index(Request $request)
    {
        $filters = $request->only(['limit', 'keyword', 'sort', 'direction']);

        $users = $this->userService->getPaginatedUsers($filters);
        $roles = $this->roleService->getAll();

        return Inertia::render("users/user-index", [
            "users" => $users,
            "roles" => $roles,
            "filters" => $filters,
        ]);
    }
}
