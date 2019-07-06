<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Entity\User;
use App\ResponseMapper\UserResponseMapper;
use App\Entity\Credential;

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
        return new JsonResponse($this->prepareDataListResponse($data, new UserResponseMapper()), Response::HTTP_OK);
    }

    /**
     * @Route("/{idUser}", name="api_get_user",  methods={"GET"})
     * @param String $idUser
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */

    public function getDetail(int $idUser)
    {
        $em = $this->getDoctrine();

        /** @var \App\Entity\User $user */
        $user = $em->getRepository(User::class)->find($idUser);
        
        /** @var \App\Entity\Credential $credential*/
        $credential = $em->getRepository(Credential::class)->find($idUser);

        return new JsonResponse(['data' => (new UserResponseMapper())->getUserDetail($user, $credential)], Response::HTTP_OK);
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
        
        $violationsUser = $validator->validate($user);

        if (count($violationsUser)) {
            list($respStatus, $respData) = $this->getResponseErrors($violationsUser);
        } else {
            try {
                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->flush();

                $credentials = new Credential();
                $credentials->setUsername($data['username']);
                $credentials->setPassword($data['password']);
                $credentials->setRole($data['role']);
                $credentials->setUserId($user->getId());
                $credentials->setUser($user);
                $violationsCredentials = $validator->validate($credentials);
                if(count($violationsCredentials) > 0) {
                    $em->detach($user);
                    $em->flush();
                    list($respStatus, $respData) = $this->getResponseErrors($violationsCredentials);
                } else {
                    $em->persist($credentials);
                    $em->flush();
                    $respStatus = Response::HTTP_CREATED;
                }
                $em->close();
            }  catch(Exception $e){
                if( $em && $em->isOpen()) {
                    $em->close();
                }
                $respData = ["errors" => [$e->getMessage()]];
                $respStatus = Response::HTTP_BAD_REQUEST;
            }
        }
        return new JsonResponse($respData, $respStatus);
    }

    /**
     * @Route("/{idUser}", name="api_put_users",  methods={"PUT"})
     * @param Request $request
     * @param Integer idUser
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function updateUser(Request $request, int $idUser, ValidatorInterface $validator)
    {
        $respStatus = Response::HTTP_INTERNAL_SERVER_ERROR;
        $respData = [];

        $data = json_decode(
            $request->getContent(),
            true
        );

        $user = $this->getDoctrine()->getRepository(User::class)->find($idUser);

        $user->setName($data['name'] ?? null);
        $user->setSurname($data['surname'] ?? null);
        $user->setGender($data['gender'] ?? null);
        $user->setEmail($data['email'] ?? null);

        $violations = $validator->validate($user);

        if (count($violations) > 0) {
            list($respStatus, $respData) = $this->getResponseErrors([$violations]);
        } else {
            try {
                $em = $this->getDoctrine()->getManager();
                /** @var \App\Entity\Credential $credential*/
                $credential = $em->getRepository(Credential::class)->find($idUser);
                $skipSave = false;
                if ($credential->getRole() !== $data['role']) {
                    $credential->setRole($data['role']);

                    $violationsCredentials = $validator->validate($credential);
                    if(count($violationsCredentials) > 0) {
                        $respStatus = Response::HTTP_BAD_REQUEST;
                        $respData = ["errors" => ["InvalidUserRole"]];
                        $skipSave = true;
                    } else {
                        $em->persist($credential);
                    }
                }
                if(!$skipSave) {
                    $em->persist($user);
                    $em->flush();
                }
                $em->close();
                $respStatus = Response::HTTP_OK;
            } catch(Exception $e){
                $respData = ["errors" => [$e->getMessage()]];
                $respStatus = Response::HTTP_BAD_REQUEST;
            } 

        }
        return new JsonResponse($respData, $respStatus);
    }


    /**
     * @Route("/{idUser}", name="api_delete_user",  methods={"DELETE"})
     * @param Integer $idUser
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */

    public function deleteUser(int $idUser)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository(User::class)->find($idUser);
        $em->remove($user);
        $em->flush();
        $em->close();
        return new JsonResponse(Response::HTTP_OK);
    }

}
