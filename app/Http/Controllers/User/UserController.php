<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Interfaces\Services\UserServiceInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['limit', 'keyword', 'sort', 'direction']);

        $users = $this->userService->getPaginatedUsers($filters);

        return Inertia::render("users/user-index", [
            "users" => $users,
            "filters" => $filters,
        ]);
    }
}
