<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Entity\User;

/**
 * @Route("/users")
 */
class UserController extends AbstractController
{

    /**
     * @Route("", name="api_get_users",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getList(Request $request)
    {

        $data = $this->getDoctrine()->getRepository(User::class)->findAll();
        return new JsonResponse(["data" => array_map(array($this, "serialize"), $data)], Response::HTTP_OK);
    }

    /**
     * @Route("", name="api_post_users",  methods={"POST"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function createUser(Request $request, ValidatorInterface $validator)
    {
        $respStatus = Response::HTTP_INTERNAL_SERVER_ERROR;
        $respData = [];

        $data = json_decode(
            $request->getContent(),
            true
        );

        $user = new User();
        $user->setName($data['name'] ?? null);
        $user->setSurname($data['surname'] ?? null);
        $user->setGender($data['gender'] ?? null);
        $user->setEmail($data['email'] ?? null);

        $violations = $validator->validate($user);

        if (count($violations) > 0) {
            /*
                 * Uses a __toString method on the $errors variable which is a
                 * ConstraintViolationList object. This gives us a nice string
                 * for debugging.
                 */
            $errors = [];
            foreach ($violations as $violation) {
                $errors[] = ["attribute" => $violation->getPropertyPath(), "message" => $violation->getMessage()];
            }
            $respData = ["errors" => $errors];
            $respStatus = Response::HTTP_BAD_REQUEST;
        } else {
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();

            $respData = ["data" => $this->serialize($user)];
            $respStatus = Response::HTTP_CREATED;
        }
        return new JsonResponse($respData, $respStatus);
    }

    private function serialize(User $user)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $json = $serializer->serialize($user, 'json');
        return $json;
    }
}
