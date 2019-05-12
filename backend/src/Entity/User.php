<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User {
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=100)
     * @Assert\NotBlank
     */
    private $name;

    /**
     * @var string
     * @ORM\Column(name="surname", type="string", length=100)
     * @Assert\NotBlank
     */
    private $surname;

    /**
     * @var string
     * @ORM\Column(name="gender", type="enumgender", length=1, nullable=true)
     */
    private $gender;

    /**
     * @var string
     * @ORM\Column(name="email", type="string", length=100)
     * @Assert\Email
     * @Assert\NotBlank
     */
    private $email;


    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getName() {
        return $this->name;
    }

    public function setSurname($surname) {
        $this->surname = $surname;
    }

    public function getSurname() {
        return $this->surname;
    }

    public function setGender($gender) {
        $this->gender = $gender;
    }

    public function getGender() {
        return $this->gender;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getEmail() {
        return $this->email;
    }

}