<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle an incoming authentication request and return a token.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(LoginRequest $request): JsonResponse
    {
        // Vérifie les informations d'identification de l'utilisateur
        $request->authenticate();

        // Récupère l'utilisateur authentifié
        $user = Auth::user();

        // Crée un token pour l'utilisateur
        $token = $user->createToken('YourAppName')->plainTextToken;

        // Retourne une réponse JSON avec le message et le token
        return response()->json([
            'message' => 'Connexion réussie.',
            'token' => $token,
        ]);
    }

    /**
     * Destroy an authenticated session (logout).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(): JsonResponse
    {
        // Déconnecte l'utilisateur en révoquant le token actuel
        Auth::user()->tokens->each(function ($token) {
            $token->delete();
        });

        // Retourne une réponse JSON indiquant que l'utilisateur a été déconnecté
        return response()->json([
            'message' => 'Déconnexion réussie.',
        ]);
    }
}
