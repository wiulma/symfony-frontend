<?php
/**
 * JWTToken
 *
 */

namespace App\Security;

use \Firebase\JWT\JWT;
use App\Entity\Credential;

class JWTToken
{

    const JWTKEY = "sample-jwtkey";

    const JWTALG = 'HS256';

    /**
     * Encode user credentials in jwt token
     * @param Credential $auth
     * @return jwt token
     */
    public static function encode(Credential $auth) {

        $tokenId    = base64_encode(random_bytes(32));
        $issuedAt   = time();
        $notBefore  = $issuedAt + 10;             //Adding 10 seconds
        $expire     = $notBefore + 60;            // Adding 60 seconds
        $serverName = $_SERVER['HTTP_HOST']; // Retrieve the server name from config file
        
        /*
         * Create the token as an array
         */
        $token = [
            'iat'  => $issuedAt,         // Issued at: time when the token was generated
            'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
            'iss'  => $serverName,       // Issuer
            'nbf'  => $notBefore,        // Not before
            'exp'  => $expire,           // Expire
            'data' => [                  // Data related to the signer user
                'userId' => $auth->getUserId() // userid from the users table
            ]
        ];

        return JWT::encode($token, self::JWTKEY);
    }

    /**
     * Decode jwt token into object
     * @param jwt token
     * @return object decoded token
     */
    public static function decode($jwt) {
        return JWT::decode($jwt, self::JWTKEY, array(self::JWTALG));
    }


}