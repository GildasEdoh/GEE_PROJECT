<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    // Créer une évaluation
    public function store(Request $request)
    {
        $evaluation = Evaluation::create($request->all());
        return response()->json($evaluation, 201);
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
        $evaluation = Evaluation::find($id);
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
        $evaluation->update($request->all());
        return response()->json($evaluation);
    }

    // Supprimer une évaluation
    public function destroy($id)
    {
        $evaluation = Evaluation::find($id);
        if (!$evaluation) {
            return response()->json(['message' => 'Évaluation non trouvée'], 404);
        }
        $evaluation->delete();
        return response()->json(['message' => 'Évaluation supprimée']);
    }
}
