<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    // Créer une évaluation
    public function store(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'libelle' => 'required|string|max:255',
            'abreviation' => 'nullable|string|max:50',
            'moyenneAdmissible' => 'required|numeric|min:0|max:20',
            'cloture' => 'required|boolean',
            'fk_session' => 'required|exists:Session,id',
            'fk_matiere' => 'required|exists:Matiere,id',
        ]);

        // Création de l'évaluation
        $evaluation = Evaluation::create($validatedData);

        return response()->json([
            'message' => 'Évaluation créée avec succès',
            'evaluation' => $evaluation
        ], 201);
    }

    // Lire toutes les évaluations
    public function index()
    {
        $evaluations = Evaluation::all();
        return response()->json($evaluations);
    }

    // Lire une évaluation par ID
    public function show($id)
    {
        $evaluation = Evaluation::with(['sessions', 'matieres'])->find($id);
        if (!$evaluation) {
            return response()->json(['message' => 'Évaluation non trouvée'], 404);
        }
        return response()->json($evaluation);
    }

    // Mettre à jour une évaluation
    public function update(Request $request, $id)
    {
        $evaluation = Evaluation::find($id);
        if (!$evaluation) {
            return response()->json(['message' => 'Évaluation non trouvée'], 404);
        }

        // Validation des données
        $validatedData = $request->validate([
            'libelle' => 'sometimes|string|max:255',
            'abreviation' => 'sometimes|nullable|string|max:50',
            'moyenneAdmissible' => 'sometimes|numeric|min:0|max:20',
            'cloture' => 'sometimes|boolean',
            'fk_session' => 'sometimes|exists:sessions,id',
            'fk_matiere' => 'sometimes|exists:matieres,id',
        ]);

        // Mise à jour
        $evaluation->update($validatedData);

        return response()->json([
            'message' => 'Évaluation mise à jour avec succès',
            'evaluation' => $evaluation
        ]);
    }

    // Supprimer une évaluation
    public function destroy($id)
    {
        $evaluation = Evaluation::find($id);
        if (!$evaluation) {
            return response()->json(['message' => 'Évaluation non trouvée'], 404);
        }

        $evaluation->delete();
        return response()->json(['message' => 'Évaluation supprimée avec succès']);
    }
}
