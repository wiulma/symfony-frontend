<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Psr\Log\LoggerInterface;

use App\Entity\Credential;
use App\Security\JWTToken;
use App\RequestEntity\LoginRequest;
use App\Security\PasswordChecker;

/**
 * @Route("/login")
 */
class LoginController extends AbstractRestController
{

    private $logger;
    /** @var  \App\Security\PasswordChecker $passwordChecker */
    private $passwordChecker;

    public function __construct(PasswordChecker $passwordChecker, LoggerInterface $logger)
    {
        $this->logger = $logger;
        $this->passwordChecker = $passwordChecker;
    }

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

        $this->logger->warning(str_replace("%uname%", $data['username'], "Logging by %uname%"));

        $login = new LoginRequest();

        $login->setUsername($data['username'] ?? null);
        $login->setPassword($data['password'] ?? null);

        $violations = $validator->validate($login);

        if (count($violations) == 0) {

            $doctrine = $this->getDoctrine();

            /** @var  \App\Entity\Credential $passwordChecker */
            $auth = $doctrine
                ->getRepository(Credential::class)
                ->findOneBy([
                    "username" => $login->getUsername()
                ]);

            if ($auth && $this->passwordChecker->verify($data['password'], $auth->getPassword())) {
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
