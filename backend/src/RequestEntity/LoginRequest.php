<?php

namespace App\RequestEntity;

use Symfony\Component\Validator\Constraints as Assert;

class LoginRequest
{

  /**
   * @var string
   * @Assert\NotBlank(message="empty.username")
   */
  private $username;

  /**
   * @var string
   * @Assert\NotBlank(message="empty.password")
   */
  private $password;


  public function setUsername($username)
  {
    $this->username = $username;
  }

  public function getUsername()
  {
    return $this->username;
  }

  public function setPassword($password)
  {
    $this->password = $password;
  }

  public function getPassword()
  {
    return $this->password;
  }
}
