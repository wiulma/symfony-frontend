<?php

namespace App\Controller\Api;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Log\LoggerInterface;

use App\Form\ArticleFormType;
use App\Entity\Article;

/**
 * @Route("/articles")
 */
class ArticleController extends AbstractRestController
{

    
    /** @var Psr\Log\LoggerInterface $logger */
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }

    /**
     * @Route("", name="api_get_articles",  methods={"GET"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getList(Request $request): JsonResponse
    {
        $data = $this->getDoctrine()->getRepository(Article::class)->findAll();
        $errorResult = $data->getUndfinedMessage();
        return new JsonResponse($this->prepareDataListResponse($data), Response::HTTP_OK);
    }

    /**
     * @Route("/{id}", name="api_get_article",  methods={"GET"})
     * @param integer $id
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */

    public function getDetail(int $id): JsonResponse
    {

        /** @var \App\Entity\Article $item */
        $item = $this->getDoctrine()->getRepository(Article::class)->find($id);

        return new JsonResponse(['data' => $this->normalize($item)], Response::HTTP_OK);
    }

    /**
     * @Route("", name="api_post_article",  methods={"POST"})
     * @param Request $request
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        return $this->manageEntity($request, ArticleFormType::class, new Article());

    }

    /**
     * @Route("/{id}", name="api_put_article",  methods={"PUT"})
     * @param Request $request
     * @param Integer idDocument
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        if (!$id || $id === "") {
            return new JsonResponse(["error" => "MissingId"], Response::HTTP_BAD_REQUEST);
        }

        /** @var \App\Entity\Document $item */
        $item = $this->getDoctrine()->getRepository(Article::class)->find($id);

        return $this->manageEntity($request, ArticleFormType::class, $item);
    }


    /**
     * @Route("/{id}", name="api_delete_article",  methods={"DELETE"})
     * @param Integer $id
     * @return JsonResponse|\Symfony\Component\HttpFoundation\JsonResponse
     */

    public function delete(int $id): JsonResponse
    {
        return $this->deleteItem(Article::class, $id);
    }
}
