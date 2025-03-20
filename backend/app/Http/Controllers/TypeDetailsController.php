<?php

namespace App\Http\Controllers;

use App\Models\TypeDetails;
use Illuminate\Http\Request;

class TypeDetailsController extends Controller
{
    // Créer un type de détail
    public function store(Request $request)
    {
        $typeDetail = TypeDetails::create($request->all());
        return response()->json($typeDetail, 201);
    }

    // Lire tous les types de détails
    public function index()
    {
        $typeDetails = TypeDetails::all();
        return response()->json($typeDetails);
    }

    // Lire un type de détail par ID
    public function show($id)
    {
        $typeDetail = TypeDetails::find($id);
        if (!$typeDetail) {
            return response()->json(['message' => 'Type de détail non trouvé'], 404);
        }
        return response()->json($typeDetail);
    }

    // Mettre à jour un type de détail
    public function update(Request $request, $id)
    {
        $typeDetail = TypeDetails::find($id);
        if (!$typeDetail) {
            return response()->json(['message' => 'Type de détail non trouvé'], 404);
        }
        $typeDetail->update($request->all());
        return response()->json($typeDetail);
    }

    // Supprimer un type de détail
    public function destroy($id)
    {
        $typeDetail = TypeDetails::find($id);
        if (!$typeDetail) {
            return response()->json(['message' => 'Type de détail non trouvé'], 404);
        }
        $typeDetail->delete();
        return response()->json(['message' => 'Type de détail supprimé']);
    }
}
