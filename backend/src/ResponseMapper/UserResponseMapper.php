<?php

namespace App\ResponseMapper;

class UserResponseMapper
{
    public function normalizeListItem(\App\Entity\User $item)
    {
        return [
            "id" => $item->getId(),
            "name" => $item->getName(),
            "surname" => $item->getSurname(),
            "email" => $item->getEmail()
        ];        
    }

    /**
     * @param App\Entity\User $user
     */
    public function getUserDetail(\App\Entity\User $user, \App\Entity\Credential $credential) {
        return [
            "id" => $user->getId(),
            "name" => $user->getName(),
            "surname" => $user->getSurname(),
            "email" => $user->getEmail(),
            "gender" => $user->getGender(),
            "role" => $credential->getRole(),
            "username" => $credential->getUsername(),
        ];  
    }

}