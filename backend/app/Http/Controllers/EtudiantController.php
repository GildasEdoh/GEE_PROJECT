<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


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
        // Valider les données
        $validatedData = $request->validate([
            'etudiants.*.numero_carte' => 'required|integer',
            'etudiants.*.nom' => 'required|string|max:100',
            'etudiants.*.prenom' => 'nullable|string|max:100',
            'etudiants.*.date_naissance' => 'nullable|date_format:m/d/Y', // Accepte le format MM/DD/YYYY
            'etudiants.*.lieu_naissance' => 'nullable|string|max:100',
            'etudiants.*.sexe' => 'nullable|in:M,F',
            'etudiants.*.Tel_1' => 'nullable|string|max:20',
            'etudiants.*.id_etablissement' => 'nullable|integer',
            'etudiants.*.Nationalite' => 'nullable|string|max:50',
            'etudiants.*.Tel_2' => 'nullable|string|max:50',
            'etudiants.*.ville' => 'nullable|string|max:30',
            'etudiants.*.quartier' => 'nullable|string|max:30',
            'etudiants.*.rue' => 'nullable|string|max:40',
        ]);

        $etudiants = [];

        foreach ($validatedData['etudiants'] as $data) {
            // Convertir la date au format MySQL
            $dateNaissance = \DateTime::createFromFormat('m/d/Y', $data['date_naissance']);
            $data['date_naissance'] = $dateNaissance->format('Y-m-d');

            // S'assurer que numero_carte est bien un entier
            $data['numero_carte'] = (int)$data['numero_carte'];
            // dd($data->all());

            $etudiants[] = Etudiant::create($data);
        }

        return response()->json([
            'success' => true,
            'data' => $etudiants,
            'message' => count($etudiants) . ' étudiant(s) créé(s) avec succès'
        ], 201);
    }

    // Liste des etudiants en fonction du parcours
    public function listeParCriteres(Request $request)
    {
        // Validation des paramètres
        $request->validate([
            'id_etablissement' => 'required|integer',
            'id_filiere' => 'required|integer',
            'id_annee_etude' => 'required|integer',
            'id_annee_univ' => 'required|integer',
            'id_session' => 'required|integer',
        ]);

        // Appel de la procédure stockée
        $etudiants = DB::select('CALL liste_etudiants_par_criteres(?, ?, ?, ?, ?)', [
            $request->id_etablissement,
            $request->id_filiere,
            $request->id_annee_etude,
            $request->id_annee_univ,
            $request->id_session
        ]);

        return response()->json($etudiants);
    }

    // Récupérer tous les étudiants par matière
    public function obtainAllEtudiantsBySubject(Request $request)
    {
        $request->validate([
            'id_etablissement' => 'required|integer',
            'id_filiere' => 'required|integer',
            'id_annee_etude' => 'required|integer',
            'id_annee_univ' => 'required|integer',
            'id_session' => 'required|integer',
            'id_evaluation' => 'required|integer',
            'id_matiere' => 'required|integer',
        ]);

        $etudiants = DB::select('CALL get_stats_matiere_etudiants(?, ?, ?, ?, ?, ?, ?)', [
            $request->id_etablissement,
            $request->id_filiere,
            $request->id_annee_etude,
            $request->id_annee_univ,
            $request->id_session, 
            $request->id_evaluation, 
            $request->id_matiere, 
        ]);


        return response()->json($etudiants);
    }
    // Liste des etudiants inscrits
}
