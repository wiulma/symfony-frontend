<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity
 * @ORM\Table(name="credentials")
 */
class Credential implements UserInterface {

    /**
     * @ORM\Id
     * @ORM\Column(name="userId", type="integer")
     * @Assert\NotBlank
     * @Groups({"full"})
     */
    private $userId;

    /**
     * @var string
     * @ORM\Column(name="username", type="string", length=100)
     * @Assert\NotBlank
     * @Groups({"profile"})
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
     * @Groups({"profile"})
     */
    private $role;

    /**
     * @var string
     * @ORM\Column(name="token", type="string", length=100, nullable=true)
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

    public function getRoles()
    {
        return array('ROLE_USER');
    }

    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials()
    {
        $this->setToken(null);
    }

}