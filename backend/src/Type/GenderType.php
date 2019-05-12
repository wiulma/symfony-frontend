<?php
namespace App\Type;

class GenderType extends EnumType
{
    protected $name = 'enumgender';
    protected $values = array('M', 'F');
}