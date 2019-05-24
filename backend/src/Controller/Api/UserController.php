<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Entity\User;
use App\ResponseMapper\UserResponseMapper;

/**
 * @Route("/users")
 */
class UserController extends AbstractRestController
{

    /**
     * @Route("", name="api_get_users",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getList(Request $request)
    {
        $data = $this->getDoctrine()->getRepository(User::class)->findAll();
        return new JsonResponse(["data" => $this->serializeList($data, new UserResponseMapper())], Response::HTTP_OK);
    }

    /**
     * @Route("/{idUser}", name="api_get_user",  methods={"GET"})
     * @param String $idUser
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */

    public function getDetail($idUser)
    {
        $data = $this->getDoctrine()->getRepository(User::class)->findOneBy(["id" => $idUser]);
        return new JsonResponse(["data" => $this->serialize($data)], Response::HTTP_OK);
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

}
