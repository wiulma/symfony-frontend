<?php

namespace App\Security;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use App\Entity\Credential;
use App\Security\JWTToken;

class JwtAuthenticator extends AbstractGuardAuthenticator
{
    private $em;
    private $jwtEncoder;

    public function __construct(EntityManagerInterface $em, JWTToken $jwtEncoder)
    {
        $this->em = $em;
        $this->jwtEncoder = $jwtEncoder;
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new JsonResponse('Auth header required', 401);
    }

    public function getCredentials(Request $request)
    {
        if (!$request->headers->has('Authorization')) {
            return null;
        }

        $extractor = new AuthorizationHeaderTokenExtractor('Bearer');

        $token = $extractor->extract($request);

        if (!$token) {
            return null;
        }

        return $token;
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $data = $this->jwtEncoder->decode($credentials);

        if (!$data){
            return null;
        }

        $data = json_decode(json_encode($data), true);

        $userId = $data['data'] ? $data['data']['userId'] : null;

        $user = $this->em->getRepository(Credential::class)
            ->findOneBy(['userId' => $userId]);

        if (!$user){
            return null;
        }

        return $user;
    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        $data = $this->jwtEncoder->decode($credentials);

        if (!$data){
            return false;
        }

        $data = json_decode(json_encode($data), true);

        return $data['data']['userId'] === $user->getUserId();
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse([
            'message' => $exception->getMessage()
        ], 401);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        return;
    }

    public function supportsRememberMe()
    {
        return false;
    }

    public function supports(Request $request)
    {
        return true;
    }

}