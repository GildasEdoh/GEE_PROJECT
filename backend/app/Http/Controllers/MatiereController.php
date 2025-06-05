<?php

namespace App\Http\Controllers;

use App\Models\Matiere;
use Illuminate\Http\Request;

class MatiereController extends Controller
{
    // Créer une matière
    public function store(Request $request)
    {
        $matiere = Matiere::create($request->all());
        return response()->json($matiere, 201);
    }

    // Lire toutes les matières
    public function index()
    {
        $matieres = Matiere::all();
        return response()->json($matieres);
    }

    // Lire une matière par ID
    public function show($id)
    {
        $matiere = Matiere::find($id);
        if (!$matiere) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }
        return response()->json($matiere);
    }


    // Mettre à jour une matière
    public function update(Request $request, $id)
    {
        // Vérifier si la matière existe
        $matiere = Matiere::find($id);
        if (!$matiere) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }

        // Validation des données
        $validatedData = $request->validate([
            'libelle' => 'required|string|max:255',
            'abreviation' => 'nullable|string|max:10',
            'optionnelle' => 'boolean',
            'coefficient' => 'required|integer|min:1|max:10',
        ]);

        // Mettre à jour la matière
        $matiere->update($validatedData);

        return response()->json([
            'message' => 'Matière mise à jour avec succès',
            'matiere' => $matiere
        ]);
    }

    // Supprimer une matière
    public function destroy($id)
    {
        // Vérifier si la matière existe
        $matiere = Matiere::find($id);
        if (!$matiere) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }

        // Supprimer la matière
        $matiere->delete();

        return response()->json(['message' => 'Matière supprimée avec succès']);
    }
}
