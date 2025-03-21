<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    // Créer une inscription
    public function store(Request $request)
    {
        $inscription = Inscription::create($request->all());
        return response()->json($inscription, 201);
    }

    // Lire toutes les inscriptions
    public function index()
    {
        $inscriptions = Inscription::all();
        return response()->json($inscriptions);
    }

    // Lire une inscription par ID
    public function show($id)
    {
        $inscription = Inscription::find($id);
        if (!$inscription) {
            return response()->json(['message' => 'Inscription non trouvée'], 404);
        }
        return response()->json($inscription);
    }

    // Mettre à jour une inscription
    public function update(Request $request, $id)
    {
        $inscription = Inscription::find($id);
        if (!$inscription) {
            return response()->json(['message' => 'Inscription non trouvée'], 404);
        }
        $inscription->update($request->all());
        return response()->json($inscription);
    }

    // Supprimer une inscription
    public function destroy($id)
    {
        $inscription = Inscription::find($id);
        if (!$inscription) {
            return response()->json(['message' => 'Inscription non trouvée'], 404);
        }
        $inscription->delete();
        return response()->json(['message' => 'Inscription supprimée']);
    }
}
