<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Entity\Credential;
use App\Security\JWTToken;
use App\RequestEntity\LoginRequest;

/**
 * @Route("/login")
 */
class LoginController extends AbstractRestController
{

    /**
     * @Route("", name="api_post_login",  methods={"POST"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function doLogin(Request $request, ValidatorInterface $validator)
    {
        $respStatus = Response::HTTP_INTERNAL_SERVER_ERROR;
        $respData = [];

        $data = json_decode($request->getContent(), true);

        $this->filterData($data);

        $login = new LoginRequest();

        $login->setUsername($data['username'] ?? null);
        $login->setPassword($data['password'] ?? null);

        $violations = $validator->validate($login);

        if (count($violations) == 0) {

            $doctrine = $this->getDoctrine();

            $auth = $doctrine
                ->getRepository(Credential::class)
                ->findOneBy([
                    "username" => $login->getUsername(),
                    "password" => $login->getPassword()
                ]);

            if (isset($auth)) {
                $em = $doctrine->getManager();
                $auth->setToken(JWTToken::encode($auth));
                $em->persist($auth);
                $em->flush();

                $respData = ["token" => $auth->getToken(), "role" => $auth->getRole()];
                $respStatus = Response::HTTP_OK;
            } else {
                $respStatus = Response::HTTP_UNAUTHORIZED;
            }
            return new JsonResponse($respData, $respStatus);
        } else {
            $errors = $this->getErrorsFromValidator($violations);
            $respData = ["errors" => $errors];
            return new JsonResponse($respData, Response::HTTP_BAD_REQUEST);
        }
    }
    
}
