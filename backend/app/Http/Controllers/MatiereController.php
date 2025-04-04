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
        $matiere = Matiere::find($id);
        if (!$matiere) {
            return response()->json(['message' => 'Matière non trouvée'], 404);
        }
    }
}
