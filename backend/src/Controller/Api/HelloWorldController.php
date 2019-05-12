<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * @Route("/hello")
 */
class HelloWorldController extends AbstractController
{

    /**
     * @Route("", name="api_hello_world",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function getData(Request $request) {
        return new JsonResponse(["message" => "Hello from backend!"], Response::HTTP_OK);
    }
    
    /**
     * @Route("/error", name="api_hello_world_error",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function getErrors(Request $request) {
        return new JsonResponse(["errors" => ["message" =>"Hello from backend!"]], Response::HTTP_BAD_REQUEST);
    }
}
