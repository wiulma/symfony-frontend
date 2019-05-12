<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Credential;

/**
 * @Route("/login")
 */
class LoginController extends AbstractController
{

    /**
     * @Route("", name="api_post_login",  methods={"POST"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function doLogin(Request $request)
    {
        $respStatus = Response::HTTP_INTERNAL_SERVER_ERROR;
        $respData = [];

        $data = json_decode(
            $request->getContent(),
            true
        );

        $doctrine = $this->getDoctrine();

        $auth = $doctrine
            ->getRepository(Credential::class)
            ->findOneBy(["username" => $data["username"], "password" => $data["password"]]);

        if (isset($auth )) {
            $em = $doctrine->getManager();
            // https://github.com/firebase/php-jwt
            $auth->setToken("aaa");
            $em->persist($auth);
            $em->flush();

            $respData = ["token" => $auth->getToken()];
            $respStatus = Response::HTTP_OK;

        } else {
            $respStatus = Response::HTTP_UNAUTHORIZED;
        }
        return new JsonResponse($respData, $respStatus);
    }

}
