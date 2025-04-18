<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance']);
        $middleware->validateCsrfTokens(except: [
            'stripe/*',
            'http://localhost:8000/etudiants',
            'http://localhost:8000/matieres',
            'http://localhost:8000/coefficients',
            'http://localhost:8000/coefficient',
            'http://localhost:8000/sessions',
            'http://localhost:8000/inscriptions',
            'http://localhost:8000/evaluations',
            'http://localhost:8000/notes',
            'http://localhost:8000/typedetails',
            'http://localhost:8000/typedetails',
            // 'http://127.0.0.1:8000/login',

        ]);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
