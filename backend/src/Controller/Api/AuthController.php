<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/auth")
 */
class AuthController extends AbstractRestController
{

    /**
     * @Route("", name="api_auth",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function getData(Request $request) {
        return new JsonResponse([], Response::HTTP_OK);
    }

}