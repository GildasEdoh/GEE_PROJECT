<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Définir le chemin par défaut après connexion.
     */
    public const HOME = '/dashboard';

    /**
     * Bootstrapping des services d'application.
     */
    public function boot()
    {
        $this->routes(function () {
            // Routes API
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // Routes Web
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
