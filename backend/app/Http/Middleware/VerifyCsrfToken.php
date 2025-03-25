<?php

namespace App\Http\Middleware;

//use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Les URI exemptées de la vérification CSRF.
     *
     * @var array<int, string>
     */
    
    protected $except = [
        'http://localhost:3000/*', // Désactive CSRF pour toutes les routes API
        '/login',
        '/sanctum/csrf-cookie',
    ];
    
}
