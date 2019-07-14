<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User {
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Groups({"default", "profile"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=100)
     * @Assert\NotBlank
     * @Groups({"profile"})
     */
    private $name;

    /**
     * @var string
     * @ORM\Column(name="surname", type="string", length=100)
     * @Assert\NotBlank
     * @Groups({"profile"})
     */
    private $surname;

    /**
     * @var string
     * @ORM\Column(name="gender", type="string", length=1, nullable=true)
     * enumgender
     */
    private $gender;

    /**
     * @var string
     * @ORM\Column(name="email", type="string", length=100)
     * @Assert\Email
     * @Assert\NotBlank
     * @Groups({"profile"})
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

    /**
     * // needs jms serializer in order to work:
     * https://symfonycasts.com/screencast/symfony-rest/serializer-basics
     * @Serializer\VirtualProperty()
     * @Groups({"profile"})
     */
    public function getFullname() {
        return $this->surname. " ".$this->name;
    }

}