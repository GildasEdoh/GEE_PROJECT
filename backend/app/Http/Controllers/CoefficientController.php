<?php

namespace App\Http\Controllers;

use App\Models\Coefficient;
use Illuminate\Http\Request;

class CoefficientController extends Controller
{
    // Créer un coefficient
    public function store(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'fk_session' => 'required|exists:sessions,id',
            'fk_matiere' => 'required|exists:matieres,id',
            'coef' => 'required|numeric|min:0',
        ]);

        // Création du coefficient
        $coefficient = Coefficient::create($validatedData);

        return response()->json([
            'message' => 'Coefficient créé avec succès',
            'coefficient' => $coefficient
        ], 201);
    }

    // Lire tous les coefficients
    public function index()
    {
        $coefficients = Coefficient::all();
        return response()->json($coefficients);
    }

    // Lire un coefficient par ID
    public function show($id)
    {
        $coefficient = Coefficient::find($id);
        if (!$coefficient) {
            return response()->json(['message' => 'Coefficient non trouvé'], 404);
        }
        return response()->json($coefficient);
    }

    // Mettre à jour un coefficient
    public function update(Request $request, $id)
    {
        $coefficient = Coefficient::find($id);
        if (!$coefficient) {
            return response()->json(['message' => 'Coefficient non trouvé'], 404);
        }

        // Validation des données
        $validatedData = $request->validate([
            'fk_session' => 'sometimes|exists:sessions,id',
            'fk_matiere' => 'sometimes|exists:matieres,id',
            'coef' => 'sometimes|numeric|min:0',
        ]);

        // Mise à jour du coefficient
        $coefficient->update($validatedData);

        return response()->json([
            'message' => 'Coefficient mis à jour avec succès',
            'coefficients' => $coefficient
        ]);
    }

    // Supprimer un coefficient
    public function destroy($id)
    {
        $coefficient = Coefficient::find($id);
        if (!$coefficient) {
            return response()->json(['message' => 'Coefficient non trouvé'], 404);
        }

        $coefficient->delete();
        return response()->json(['message' => 'Coefficient supprimé avec succès']);
    }
}
