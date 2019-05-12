<?php
/**
 * CORS.php
 *
 */

namespace App\Security;

class CORS
{

    // cross-site requests allowed domains
    const CORS_ALLOWED_HOSTS = [
        'https://prod-env',
        'https://qa-env',
        'https://dev-env',
        'http://local-env',
        'http://localhost:8000'
        // ...
    ];

    // the default CORS allowed origin response
    const CORS_DEFAULT_HOST = 'https://prod-env';

    // non-trivial headers allowed in API requests, see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
    const CORS_ALLOWED_HEADERS = 'Authorization, Content-Length, Content-Type, X-Requested-With';

    // max time in seconds a browser can cache the CORS settings
    const CORS_MAX_AGE = 120;

    // allowed HTTP methods
    const CORS_ALLOWED_METHODS = 'GET, POST, PUT, HEAD, DELETE';

}