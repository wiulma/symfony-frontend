<?php

namespace App\ResponseMapper;

use App\Entity\User;

class UserResponseMapper
{
    public function normalizeListItem(User $item)
    {
        return [
            "id" => $item->getId(),
            "name" => $item->getName(),
            "surname" => $item->getSurname(),
            "email" => $item->getEmail()
        ];        
    }

}