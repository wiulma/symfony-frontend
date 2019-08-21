<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class AbstractRestController extends AbstractController
{
    protected function getErrorsFromValidator(ConstraintViolationListInterface $errors) : array
    {
        $formattedErrors = [];
        foreach ($errors as $error) {
            $formattedErrors[$error->getPropertyPath()] = $error->getMessage();
        }

        return $formattedErrors;
    }

    protected function getErrorsFromForm(FormInterface $form) : array
    {
        $errors = array();
        foreach ($form as $fieldName => $formField) {
            $errors[$fieldName] = $formField->getErrors();
        }
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

    protected function filterData(array $data, array $customFilters = [])
    {
        foreach ($data as $key => $value) {
            $data[$key] = $value ? filter_var($value, $customFilters[$key] ?? FILTER_SANITIZE_STRING) : $value;
        }
    }


    public function normalize(Object $obj) : array
    {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);

        return $serializer->normalize($obj, 'json', ['skip_null_values' => true]);
    }

    public function normalizeList(array $list, Object $mapper = NULL) : array
    {
        $result = [];
        $encoders = [new JsonEncoder()];
        $normalizers = [
            new DateTimeNormalizer(array('datetime_format' => 'd/m/Y H:i:s')),
            new ObjectNormalizer()
        ];

        $serializer = new Serializer($normalizers, $encoders);

        foreach ($list as $item) {
            $result[] = $mapper ? $mapper->normalizeListItem($item) : $serializer->normalize($item, 'json', ['skip_null_values' => true]);
        }

        return $result;
    }

    public function prepareDataListResponse(array $data, Object $mapper = NULL): ?array
    {
        return ["data" => $this->normalizeList($data, $mapper)];
    }

    public function preparareDataResponse(Object $data): ?array
    {
        return ["data" => $this->normalize($data)];
    }

    /**
     * 
     */
    protected function getResponseErrors(\Symfony\Component\Validator\ConstraintViolationListInterface $listViolations) : array
    {
        $errors = [];

        foreach ($listViolations as $violation) {
            $errors[] = ["attribute" => $violation->getPropertyPath(), "message" => $violation->getMessage()];
        }
        $respData = ["errors" => $errors];
        $respStatus = Response::HTTP_BAD_REQUEST;
        return [$respStatus, $respData];
    }


    protected function buildForm(string $clazz, object $entity, $data)
    {
        $form = $this->createForm($clazz, $entity);

        $form->submit($data);

        return $form;
    }

    protected function manageEntity(\Symfony\Component\HttpFoundation\Request $request, string $clazz, object $entity): JsonResponse
    {
        $respStatus = Response::HTTP_INTERNAL_SERVER_ERROR;
        $respData = [];

        $form = $this->buildForm($clazz, $entity, json_decode($request->getContent(), true));

        if ($form->isValid()) {
            $item = $form->getData();

            try {
                $em = $this->getDoctrine()->getManager();
                $em->persist($item);
                $em->flush();
                $em->close();
                $respStatus = Response::HTTP_OK;
            } catch (\Exception $e) {
                if ($em && $em->isOpen()) {
                    $em->close();
                }
                $respData = ["error" => $e->getMessage()];
                $respStatus = Response::HTTP_BAD_REQUEST;
            }
        } else {
            $errors = $this->getErrorsFromForm($form);
            $respStatus = Response::HTTP_BAD_REQUEST;
            $respData = [];
        }

        return new JsonResponse($respData, $respStatus);
    }


    protected function deleteItem(string $clazz, int $id): JsonResponse
    {
        if (!$id || $id === "") {
            return new JsonResponse($respData = ["error" => "MissingId"], Response::HTTP_BAD_REQUEST);
        }

        $respData = [];
        $em = $this->getDoctrine()->getManager();
        $item = $em->getRepository($clazz)->find($id);
        if (!$item) {
            $respData = ["error" => "DataNotFound"];
            $respStatus = Response::HTTP_BAD_REQUEST;
        } else {
            $em->remove($item);
            $em->flush();
            $respStatus = Response::HTTP_OK;
        }
        $em->close();
        return new JsonResponse($respData, $respStatus);
    }
}
