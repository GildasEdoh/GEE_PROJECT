<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | This file is where you can configure your CORS settings.
    | By default, Laravel allows all origins and methods.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'register', 'logout', 'dashboard'],  // Routes API et Sanctum

    'allowed_methods' => ['*'],  // Autoriser toutes les méthodes HTTP

    'allowed_origins' => [
        'http://localhost:3000',  // Ajoute l'URL de ton frontend ici

    ],

    'allowed_headers' => ['*'],  // Permet tous les headers

    'exposed_headers' => [],
    
    'max_age' => 0,

    'supports_credentials' => true,  // Nécessaire pour les cookies et Sanctum

];
