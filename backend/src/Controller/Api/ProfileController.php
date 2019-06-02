<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Common\Annotations\AnnotationReader;
use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;

/**
 * @Route("/profile")
 */
class ProfileController extends AbstractRestController
{

    /**
     * @Route("", name="api_profile",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function getProfile(Request $request) {
        $user = $this->getUser();

        $classMetadataFactory = new ClassMetadataFactory(new AnnotationLoader(new AnnotationReader()));

        $normalizer = new ObjectNormalizer($classMetadataFactory);
        $serializer = new Serializer([$normalizer], [new JsonEncoder()]);
        $dataAuth = $serializer->normalize($user, null, ['groups' => 'profile']);
        $dataUser = $serializer->normalize($user->getUser(), null, ['groups' => 'profile']);

        return new JsonResponse(array_merge($dataAuth, $dataUser), Response::HTTP_OK);
    }

}