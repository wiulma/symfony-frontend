<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;

/**
 * AuthorizationHeaderTokenExtractor.
 */
class AuthorizationHeaderTokenExtractor
{
    /**
     * @var string
     */
    protected $prefix;

    /**
     * @var string
     */
    protected $name;

    /**
     * @param string|null $prefix
     * @param string      $name
     */
    public function __construct($prefix)
    {
        $this->prefix = $prefix;
        $this->name   = "Authorization";
    }

    /**
     * {@inheritdoc}
     */
    public function extract(Request $request)
    {
        if (!$request->headers->has($this->name)) {
            return false;
        }

        $authorizationHeader = $request->headers->get($this->name);

        if (empty($this->prefix)) {
            return $authorizationHeader;
        }

        $headerParts = explode(' ', $authorizationHeader);

        if (!(2 === count($headerParts) && 0 === strcasecmp($headerParts[0], $this->prefix))) {
            return false;
        }

        return $headerParts[1];
    }
}