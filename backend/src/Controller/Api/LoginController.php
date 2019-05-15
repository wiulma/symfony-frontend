<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use App\Entity\Credential;
use App\Security\JWTToken;
use App\RequestEntity\LoginRequest;
use App\Form\LoginType;

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
    public function doLogin(Request $request)
    {
        $respStatus = Response::HTTP_INTERNAL_SERVER_ERROR;
        $respData = [];

        $login = new LoginRequest();
        $form = $this->createForm(LoginType::class, $login);
        $data = json_decode($request->getContent(), true);
        $form->submit($data);
        if ($form->isSubmitted() && $form->isValid()) {

            //TODO filter_var
            // form validation
            // https://www.adcisolutions.com/knowledge/getting-started-rest-api-symfony-4

            // validate data with
            // https://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/converters.html

            $doctrine = $this->getDoctrine();

            $auth = $doctrine
                ->getRepository(Credential::class)
                ->findOneBy($form->getData());

            if (isset($auth )) {
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
            $errors = $this->getErrorsFromForm($form);
            $respData = ["errors" => $errors];
            return new JsonResponse($respData, Response::HTTP_BAD_REQUEST);
        }

    }

}
