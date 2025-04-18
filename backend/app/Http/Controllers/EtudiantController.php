<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{


    // Créer un étudiant
    public function store(Request $request)
    {
        $etudiant = Etudiant::create($request->all());
        return response()->json($etudiant, 201);
    }

    // Lire tous les étudiants
    public function index()
    {
        $etudiants = Etudiant::all();
        return response()->json($etudiants);
    }

    // Lire un étudiant par ID
    public function show($id)
    {
        $etudiant = Etudiant::find($id);
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant non trouvé'], 404);
        }
        return response()->json($etudiant);
    }

    public function update(Request $request, $id)
    {
        // Validation des données reçues
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'nullable|string|max:255'

        ]);

        // Recherche de l'étudiant
        $etudiant = Etudiant::find($id);
        if (!$etudiant) {
            return response()->json(['message' => 'Étudiant non trouvé'], 404);
        }

        // Mise à jour des champs
        $etudiant->update($validatedData);

        // Retourner la réponse avec les données mises à jour
        return response()->json([
            'message' => 'Étudiant mis à jour avec succès',
            'etudiant' => $etudiant
        ]);
    }


    // Supprimer un étudiant
    public function destroy($id)
    {
        $etudiant = Etudiant::find($id);
        if (!$etudiant) {
            return response()->json(['message' => 'Etudiant non trouvé'], 404);
        }
        $etudiant->delete();
        return response()->json(['message' => 'Etudiant supprimé']);
    }

    // Supprimer plusieurs etudiants
    public function destroyAll()
    {
        Etudiant::truncate(); // Supprime tout proprement (reset auto-increment aussi)
        return response()->json(['message' => 'Tous les étudiants ont été supprimés.']);
    }

    // Ajouter plusieurs etudiants
    public function bulkStore(Request $request)
    {
        $data = $request->validate([
            'etudiants' => 'required|array',
            'etudiants.*.nom' => 'required|string',
            'etudiants.*.prenom' => 'required|string',
        ]);

        Etudiant::insert($data['etudiants']);

        return response()->json(['message' => 'Étudiants ajoutés avec succès.']);
    }
}
