<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="credentials")
 */
class Credential {

    /**
     * @ORM\Id
     * @ORM\Column(name="userId", type="integer")
     * @Assert\NotBlank
     */
    private $userId;

    /**
     * @var string
     * @ORM\Column(name="username", type="string", length=100)
     * @Assert\NotBlank
     */
    private $username;

    /**
     * @var string
     * @ORM\Column(name="password", type="string", length=100)
     * @Assert\NotBlank
     */
    private $password;

    /**
     * @var string
     * @ORM\Column(name="role", type="enumrole", length=1)
     * @Assert\NotBlank
     */
    private $role;

    /**
     * @var string
     * @ORM\Column(name="token", type="string", length=100)
     */
    private $token;

    /**
     * @ORM\OneToOne(targetEntity="User")
     * @ORM\JoinColumn(name="userId", referencedColumnName="id")
     */
    private $user;


    public function setUserId($userId) {
        $this->userId = $userId;
    }

    public function getUserId() {
        return $this->userId;
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    public function getUsername() {
        return $this->username;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setRole($role) {
        $this->role = $role;
    }

    public function getRole() {
        return $this->role;
    }

    public function setToken($token) {
        $this->token = $token;
    }

    public function getToken() {
        return $this->token;
    }

    public function getUser() {
        return $this->user;
    }

    public function setUser($user) {
        $this->user = $user;
    }

}