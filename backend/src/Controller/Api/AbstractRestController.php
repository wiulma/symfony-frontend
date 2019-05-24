<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class AbstractRestController extends AbstractController
{
    protected function getErrorsFromvalidator(ConstraintViolationListInterface $errors)
    {
        $formattedErrors = [];
        foreach ($errors as $error) {
            $formattedErrors[$error->getPropertyPath()] = $error->getMessage();
        }
    
        return $formattedErrors;
    }
    
    protected function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
    
        return $errors;
    }

    protected function filterData($data, $customFilters = [])
    {
        foreach($data as $key=>$value) {
            $data[$key] = $value ? filter_var($value, $customFilters[$key] ?? FILTER_SANITIZE_STRING) : $value;
        }
    }


    public function serialize($obj)
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        return $serializer->serialize($obj, 'json');
    }

    public function serializeList($list, $mapper = NULL)
    {
        $result = [];
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        foreach ($list as $item) {
            $result[] = $mapper ? $mapper->serializeListItem ($item) : $serializer->serialize($item, 'json');
        }

        return $result;
    }

}

