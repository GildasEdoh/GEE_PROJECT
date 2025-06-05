<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    // Créer une session
    public function store(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'libelle' => 'required|string|max:255',
            'cloture' => 'required|boolean',
        ]);

        // Création de la session
        $session = Session::create($validatedData);

        return response()->json([
            'message' => 'Session créée avec succès',
            'sessions' => $session
        ], 201);
    }

    // Lire toutes les sessions
    public function index()
    {
        $sessions = Session::all();
        return response()->json($sessions);
    }

    // Lire une session par ID
    public function show($id)
    {
        $session = Session::find($id);
        if (!$session) {
            return response()->json(['message' => 'Session non trouvée'], 404);
        }
        return response()->json($session);
    }

    public function update(Request $request, $id)
    {
        $session = Session::find($id);
        if (!$session) {
            return response()->json(['message' => 'Session non trouvée'], 404);
        }

        $session->libelle = $request->libelle ?? $session->libelle;
        $session->nbcompose = $request->nbcompose ?? $session->nbcompose;
        $session->cloture = $request->cloture ?? $session->cloture;

        $session->save();

        return response()->json([
            'message' => 'Session mise à jour avec succès',
            'sessions' => $session
        ]);
    }

    // Supprimer une session
    public function destroy($id)
    {
        $session = Session::find($id);
        if (!$session) {
            return response()->json(['message' => 'Session non trouvée'], 404);
        }

        $session->delete();
        return response()->json(['message' => 'Session supprimée avec succès']);
    }
}
