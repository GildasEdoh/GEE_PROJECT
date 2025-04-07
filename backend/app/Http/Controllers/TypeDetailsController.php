<?php

namespace App\Http\Controllers;

use App\Models\TypeDetails;
use Illuminate\Http\Request;

class TypeDetailsController extends Controller
{
    /**
     * Afficher tous les types de détails.
     */
    public function index()
    {
        $typeDetails = TypeDetails::all();
        return response()->json($typeDetails);
    }

    /**
     * Créer un type de détail.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'libelle' => 'required|string|max:255',
            'abreviation' => 'nullable|string|max:50',
            'poids' => 'nullable|numeric|min:0',
        ]);

        $typeDetail = TypeDetails::create($validated);

        return response()->json([
            'message' => 'Type de détail créé avec succès.',
            'type_detail' => $typeDetail
        ], 201);
    }

    /**
     * Afficher un type de détail par ID.
     */
    public function show($id)
    {
        $typeDetail = TypeDetails::findOrFail($id);
        return response()->json($typeDetail);
    }

    /**
     * Mettre à jour un type de détail.
     */
    public function update(Request $request, $id)
    {
        $typeDetail = TypeDetails::findOrFail($id);

        $validated = $request->validate([
            'libelle' => 'sometimes|string|max:255',
            'abreviation' => 'sometimes|string|max:50',
            'poids' => 'sometimes|numeric|min:0',
        ]);

        $typeDetail->update($validated);

        return response()->json([
            'message' => 'Type de détail mis à jour avec succès.',
            'type_detail' => $typeDetail
        ]);
    }

    /**
     * Supprimer un type de détail.
     */
    public function destroy($id)
    {
        $typeDetail = TypeDetails::findOrFail($id);
        $typeDetail->delete();

        return response()->json(['message' => 'Type de détail supprimé avec succès.']);
    }
}
