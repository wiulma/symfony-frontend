<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="documents")
 */
class Document {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank
     */
    private $title;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank
     */
    private $path;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank
     */
    private $type;

    /**
     * @ORM\Column(type="datetime", name="insert_at")
     * @Assert\NotBlank
     */
    private $insertAt;

    /**
     * @ORM\Column(type="datetime", name="update_at")
     * @Assert\NotBlank
     */
    private $updateAt;

    /**
     * @ORM\Column(type="string", name="insert_by")
     * @Assert\NotBlank
     */
    private $insertBy;

    public function __construct() {
        $this->insertAt = new \DateTime();
        $this->updateAt = new \DateTime();
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        return $this->id = $id;
    }

    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        return $this->title = $title;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        return $this->description = $description;
    }
    
    public function getPath() {
        return $this->path;
    }

    public function setPath($path) {
        return $this->path = $path;
    }

    public function getType() {
        return $this->type;
    }

    public function setType($type) {
        return $this->type = $type;
    }

    public function getInsertAt() {
        return $this->insertAt;
    }

    public function setInsertAt($insertAt) {
        return $this->insertAt = $insertAt;
    }

    public function getUpdateAt() {
        return $this->updateAt;
    }

    public function setUpdateAt($updateAt) {
        return $this->updateAt = $updateAt;
    }
    
    public function getInsertBy() {
        return $this->insertBy;
    }

    public function setInsertBy($insertBy) {
        return $this->insertBy = $insertBy;
    }
}