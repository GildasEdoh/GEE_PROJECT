<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    // Créer une session
    public function store(Request $request)
    {
        $session = Session::create($request->all());
        return response()->json($session, 201);
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

    // Mettre à jour une session
    public function update(Request $request, $id)
    {
        $session = Session::find($id);
        if (!$session) {
            return response()->json(['message' => 'Session non trouvée'], 404);
        }
        $session->update($request->all());
        return response()->json($session);
    }

    // Supprimer une session
    public function destroy($id)
    {
        $session = Session::find($id);
        if (!$session) {
            return response()->json(['message' => 'Session non trouvée'], 404);
        }
        $session->delete();
        return response()->json(['message' => 'Session supprimée']);
    }
}
