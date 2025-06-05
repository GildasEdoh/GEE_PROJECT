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
        'etudiant/matieres',
        'etudiant',
        'etudiant/*',
        'http://localhost:3000/*', // Désactive CSRF pour toutes les routes API
        'sanctum/csrf-cookie', // Exclure toutes les routes API de la vérification CSRF
        'login',
        'inscriptions/parcoursId'
    ];
}
