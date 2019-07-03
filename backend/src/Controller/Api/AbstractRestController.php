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

    protected function filterData(Array $data, Array $customFilters = [])
    {
        foreach($data as $key=>$value) {
            $data[$key] = $value ? filter_var($value, $customFilters[$key] ?? FILTER_SANITIZE_STRING) : $value;
        }
    }


    public function normalize(Object $obj)
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        return $serializer->normalize($obj, 'json', ['skip_null_values' => true]);
    }

    public function normalizeList(Array $list, Object $mapper = NULL)
    {
        $result = [];
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        foreach ($list as $item) {
            $result[] = $mapper ? $mapper->normalizeListItem ($item) : $serializer->normalize($item, 'json', ['skip_null_values' => true]);
        }

        return $result;
    }

    public function prepareDataListResponse(Array $data, Object $mapper = NULL): ?array {
        return ["data" => $this->normalizeList($data, $mapper)];
    }

    public function preparareDataResponse(Object $data): ?array {
        return ["data" => $this->normalize($data)];
    }

}

