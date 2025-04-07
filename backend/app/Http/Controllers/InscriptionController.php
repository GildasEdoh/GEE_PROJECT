<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    // Créer une inscription
    public function store(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'annee' => 'required|integer|min:2000|max:2100',
            'etudiant_id' => 'required|exists:Etudiant,id',
            'session_id' => 'required|exists:Session,id',
        ]);

        // Création de l'inscription
        $inscription = Inscription::create($validatedData);

        return response()->json([
            'message' => 'Inscription créée avec succès',
            'inscription' => $inscription
        ], 201);
    }

    // Lire toutes les inscriptions
    public function index()
    {
        $inscriptions = Inscription::with(['etudiant', 'session'])->get();
        return response()->json($inscriptions);
    }

    // Lire une inscription par ID
    public function show($id)
    {
        $inscription = Inscription::with(['etudiant', 'session'])->find($id);
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

        // Validation des données
        $validatedData = $request->validate([
            'annee' => 'sometimes|integer|min:2000|max:2100',
            'etudiant_id' => 'sometimes|exists:Etudiant,id',
            'session_id' => 'sometimes|exists:Session,id',
        ]);

        // Mise à jour
        $inscription->update($validatedData);

        return response()->json([
            'message' => 'Inscription mise à jour avec succès',
            'inscription' => $inscription
        ]);
    }

    // Supprimer une inscription
    public function destroy($id)
    {
        $inscription = Inscription::find($id);
        if (!$inscription) {
            return response()->json(['message' => 'Inscription non trouvée'], 404);
        }

        $inscription->delete();
        return response()->json(['message' => 'Inscription supprimée avec succès']);
    }
}
