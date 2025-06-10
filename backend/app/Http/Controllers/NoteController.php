<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\DB;


class NoteController extends Controller
{
    /**
     * Afficher la liste des notes.
     */
    public function index()
    {
        $notes = Note::with(['evaluations', 'etudiants'])->get();
        return response()->json($notes);
    }

    /**
     * Enregistrer une nouvelle note.
     */
    public function store(Request $request)
    {
        $request->validate([
            'fk_etudiant' => 'required|exists:etudiants,id',
            'fk_evaluation_matiere_type' => 'required|exists:evaluations_matieres_types,id',
            'valeur' => 'required|numeric|min:0|max:20',
            'gele' => 'nullable|boolean',
        ]);

        $note = Note::create($request->all());

        return response()->json([
            'message' => 'Note ajoutée avec succès.',
            'note' => $note
        ], 201);
    }

    /**
     * Afficher une note spécifique.
     */
    public function show($id)
    {
        $note = Note::with(['evaluations', 'etudiants'])->find($id);

        if (!$note) {
            return response()->json(['message' => 'Note non trouvée.'], 404);
        }

        return response()->json($note);
    }

    /**
     * Mettre à jour une note.
     */
    public function update(Request $request, $id)
    {
        $note = Note::find($id);

        if (!$note) {
            return response()->json(['message' => 'Note non trouvée.'], 404);
        }

        $request->validate([
            'valeur' => 'sometimes|numeric|min:0|max:20',
            'gele' => 'sometimes|boolean',
        ]);

        $note->update($request->all());

        return response()->json([
            'message' => 'Note mise à jour avec succès.',
            'note' => $note
        ]);
    }

    /**
     * Supprimer une note.
     */
    public function destroy($id)
    {
        $note = Note::find($id);

        if (!$note) {
            return response()->json(['message' => 'Note non trouvée.'], 404);
        }

        $note->delete();

        return response()->json(['message' => 'Note supprimée avec succès.']);
    }

    // Fonction  pour afficher la Repartition des notes par matieres
    public function repartitionNotes(Request $request)
    {
        // Validation des paramètres
        $request->validate([
            'id_etablissement' => 'required|integer',
            'id_filiere' => 'required|integer',
            'id_parcours' => 'required|integer',
            'id_annee_etude' => 'required|integer',
            'id_annee_univ' => 'required|integer',
            'id_type_evaluation' => 'required|integer',
            'id_session_annee' => 'required|integer',
        ]);

        // Appel de la procédure stockée avec les paramètres
        $repartition = DB::select('CALL get_repartition_notes(?, ?, ?, ?, ?, ?, ?)', [
            $request->id_etablissement,
            $request->id_filiere,
            $request->id_parcours,
            $request->id_annee_etude,
            $request->id_annee_univ,
            $request->id_type_evaluation,
            $request->id_session_annee
        ]);

        return response()->json($repartition);
    }

    // Fonction pour afficher les recalés par matieres

    public function nombreRecalesToutesMatieres(Request $request)
    {
        // Validation des paramètres
        $request->validate([
            'id_etablissement' => 'required|integer',
            'id_filiere' => 'required|integer',
            'id_parcours' => 'required|integer',
            'id_annee_etude' => 'required|integer',
            'id_annee_univ' => 'required|integer',
            'id_session_annee' => 'required|integer',
            'id_type_evaluation' => 'required|integer',
        ]);

        // Appel de la procédure stockée
        $resultat = DB::select('CALL nombre_recales_toutes_matieres(?, ?, ?, ?, ?, ?, ?)', [
            $request->id_etablissement,
            $request->id_filiere,
            $request->id_parcours,
            $request->id_annee_etude,
            $request->id_annee_univ,
            $request->id_session_annee,
            $request->id_type_evaluation,
        ]);

        return response()->json($resultat);
    }

    //  Repartition des etudiants par mention
    public function getStatsMentions(Request $request)
    {
        // Validation des paramètres
        $validated = $request->validate([
            'id_etablissement' => 'required|integer',
            'id_filiere' => 'required|integer',
            'id_parcours' => 'required|integer',
            'id_annee_etude' => 'required|integer',
            'id_annee_univ' => 'required|integer',
            'id_evaluation' => 'required|integer',
            'id_session' => 'required|integer',
        ]);

        // Appel de la procédure stockée avec les paramètres validés
        $resultats = DB::select(
            'CALL get_stats_mentions_etudiants(?, ?, ?, ?, ?, ?, ?)',
            [
                $validated['id_etablissement'],
                $validated['id_filiere'],
                $validated['id_parcours'],
                $validated['id_annee_etude'],
                $validated['id_annee_univ'],
                $validated['id_evaluation'],
                $validated['id_session'],
            ]
        );

        if (empty($resultats)) {
            return response()->json([
                'message' => 'Aucun résultat trouvé',
                'params' => $validated,
                'resultats' => $resultats,
            ], 404);
        }
        return response()->json($resultats);
    }

    // Fréquence des résultats par matière
    public function frequenceResultatsParMatiereGlobale(Request $request)
    {
        $validated = $request->validate([
            'id_etablissement' => 'required|integer',
            'id_filiere' => 'required|integer',
            'id_parcours' => 'required|integer',
            'id_annee_etude' => 'required|integer',
            'id_annee_univ' => 'required|integer',
            'id_session_annee' => 'required|integer',
            'id_type_evaluation' => 'required|integer',
        ]);

        $resultats = DB::select(
            'CALL frequence_resultats_par_matiere_globale(?, ?, ?, ?, ?, ?, ?)',
            [
                $validated['id_etablissement'],
                $validated['id_filiere'],
                $validated['id_parcours'],
                $validated['id_annee_etude'],
                $validated['id_annee_univ'],
                $validated['id_session_annee'],
                $validated['id_type_evaluation'],
            ]
        );

        if (empty($resultats)) {
            return response()->json([
                'message' => 'Aucun résultat trouvé',
                'params' => $validated,
                'resultats' => $resultats,
            ], 404);
        }

        return response()->json($resultats);
    }
}
