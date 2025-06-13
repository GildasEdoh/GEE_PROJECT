<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InscriptionController extends Controller
{
    // Créer une inscription
    public function store(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            'annee' => 'required|integer|min:2000|max:2100',
            'fk_etudiant' => 'required|exists:etudiants,id',
            'fk_session' => 'required|exists:sessions,id',
        ]);

        // Création de l'inscription
        $inscription = Inscription::create($validatedData);

        return response()->json([
            'message' => 'Inscription créée avec succès',
            'inscriptions' => $inscription
        ], 201);
    }

    // Lire toutes les inscriptions
    public function index()
    {
        $inscriptions = Inscription::all();
        return response()->json($inscriptions);
    }

    // Lire une inscription par ID
    public function show($id)
    {
        // $inscription = Inscription::with(['etudiants', 'sessions'])->find($id);
        // if (!$inscription) {
        //     return response()->json(['message' => 'Inscription non trouvée'], 404);
        // }
        // return response()->json($inscription);
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
            'fk_etudiant' => 'sometimes|exists:Etudiant,id',
            'fk_session' => 'sometimes|exists:Session,id',
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

        // Lire toutes les inscriptions
    public function obtainIdParcoursAnneeEtude(Request $request)
    {
        $libelle = $request->input('libelle'); 

        $id = DB::table('parcours_annees_etude')
                ->where('libelle', $libelle)
                ->value('id');

        if ($id === null) {
            return response()->json([
                'message' => "Aucun parcours avec le libellé '$libelle' n'a été trouvé."
            ], 404);
        }

        return response()->json(['id' => $id]);
    }

        // Ajouter plusieurs inscriptions
    public function bulkStore(Request $request)
    {
        $validatedData = $request->validate([
            'inscriptions' => 'required|array',
            'inscriptions.*.fk_etudiant' => 'required|integer',
            'inscriptions.*.fk_parcours_annee_etude' => 'required|integer',
            'inscriptions.*.fk_annee_univ' => 'required|integer',
        ]);

        $inscriptions= [];
        
        foreach ($validatedData['inscriptions'] as $data) {
            // Convertir les champs en entiers pour être certain
            $data['fk_etudiant'] = (int)$data['fk_etudiant'];
            $data['fk_parcours_annee_etude'] = (int)$data['fk_parcours_annee_etude'];
            $data['fk_annee_univ'] = (int)$data['fk_annee_univ'];
            $inscriptions[] = Inscription::create($data);
        }

        return response()->json([
            'success' => true,
            'data' => $inscriptions,
            'message' => count($inscriptions) . ' inscriptions(s) créé(s) avec succès'
        ], 201);
    }
}