<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Les URI exemptées de la vérification CSRF.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/*' // Exclure toutes les routes API de la protection CSRF
    ];
}
