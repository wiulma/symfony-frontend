<?php
namespace App\Security;

class PasswordChecker {

    public function hash($str) {
        return password_hash ($str, PASSWORD_ARGON2I);
    }

    public function verify($str, $hash) {
        return password_verify($str, $hash);
    }
}