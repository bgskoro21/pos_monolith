<?php

namespace App\Http\Controllers\User;

use App\DTOs\PaginationFilterDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\BulkDeleteUserRequest;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Interfaces\Services\RoleServiceInterface;
use App\Interfaces\Services\UserServiceInterface;
use App\Models\User;
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
        $pagination = PaginationFilterDTO::fromArray($request->all());

        $users = $this->userService->getPaginated($pagination);
        $roles = $this->roleService->getAll();

        return Inertia::render("users/user-index", [
            "users" => $users,
            "roles" => $roles,
            "filters" => $request->all(),
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $this->userService->store($request->validated());

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function update(User $user, UpdateUserRequest $request)
    {
        $this->userService->update($user, $request->validated());

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $result = $this->userService->destroy($user);

        if(!$result)
        {
            return redirect()->route('users.index')->with('error', 'User deleted error!');
        }

        return redirect()->route('users.index')->with('success', 'User deleted successfully');
    }

    public function bulkDelete(BulkDeleteUserRequest $request)
    {
        $count = $this->userService->bulkDelete($request->validated()['ids']);

        return redirect()->route('users.index')->with('success', "{$count} users deleted successfully");
    }
}
