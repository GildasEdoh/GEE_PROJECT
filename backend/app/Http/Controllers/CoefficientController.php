<?php

namespace App\Http\Controllers;

use App\Models\Coefficient;
use Illuminate\Http\Request;

class CoefficientController extends Controller
{
    // Créer un coefficient
    public function store(Request $request)
    {
        $coefficient = Coefficient::create($request->all());
        return response()->json($coefficient, 201);
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
        $coefficient->update($request->all());
        return response()->json($coefficient);
    }

    // Supprimer un coefficient
    public function destroy($id)
    {
        $coefficient = Coefficient::find($id);
        if (!$coefficient) {
            return response()->json(['message' => 'Coefficient non trouvé'], 404);
        }
        $coefficient->delete();
        return response()->json(['message' => 'Coefficient supprimé']);
    }
}
