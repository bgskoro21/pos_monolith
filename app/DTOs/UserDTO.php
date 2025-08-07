<?php

namespace App\DTOs;

class UserDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly ?string $password, 
        public readonly array $roles = []
    ){}

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            email:$data['email'],
            password: $data['password'],
            roles: $data['roles']
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
        ];
    }
}