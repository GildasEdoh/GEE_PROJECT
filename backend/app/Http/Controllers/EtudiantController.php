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
        $data = $request->validate([
            'etudiants' => 'required|array',
            'etudiants.*.nom' => 'required|string',
            'etudiants.*.prenom' => 'required|string',
        ]);

        Etudiant::insert($data['etudiants']);

        return response()->json(['message' => 'Étudiants ajoutés avec succès.']);
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
    public function getAllEtudiantsBySubject($idMatiere)
    {
    $idEtablissement = 1;
    $idFiliere = 3;
    $idParcours = 5;
    $idAnneeEtude = 6; // CAPACITE 1
    $idAnneeUniv = 2;  // 2024-2025

    $etudiants = DB::table('etudiants as e')
        ->join('inscriptions as i', 'i.fk_etudiant', '=', 'e.numero_carte')
        ->join('parcours_annees_etude as pae', 'i.fk_parcours_annee_etude', '=', 'pae.id')
        ->join('parcours as p', 'pae.fk_parcours', '=', 'p.id')
        ->join('filieres as f', 'p.fk_filiere', '=', 'f.id')
        ->join('etablissements as etab', 'f.fk_etablissement', '=', 'etab.id')
        ->join('annees_etude as ae', 'pae.fk_annee_etude', '=', 'ae.id')
        ->join('annees_universitaire as au', 'i.fk_annee_univ', '=', 'au.id')
        ->join('parcours_annees_etude_matieres as paem', 'paem.fk_parcours_annee_etude', '=', 'pae.id')
        ->join('matieres as m', function ($join) use ($idMatiere) {
            $join->on('paem.fk_matiere', '=', 'm.id')
                 ->where('m.id', '=', $idMatiere);
        })
        ->join('evaluations_matieres as em', function ($join) use ($idAnneeUniv) {
            $join->on('em.fk_matiere', '=', 'm.id')
                 ->where('em.fk_annee_univ', '=', $idAnneeUniv);
        })
        ->join('evaluations_matieres_types as emt', 'emt.fk_evaluation_matiere', '=', 'em.id')
        ->join('types_evaluation as te', 'emt.fk_type_evaluation', '=', 'te.id')
        ->whereNotNull('em.fk_evaluation')
        ->where('etab.id', $idEtablissement)
        ->where('f.id', $idFiliere)
        ->where('p.id', $idParcours)
        ->where('ae.id', $idAnneeEtude)
        ->where('au.id', $idAnneeUniv)
        ->select('e.numero_carte', 'e.nom', 'e.prenom', 'e.sexe')
        ->distinct()
        ->orderBy('e.numero_carte')
        ->get();

    return response()->json($etudiants);
}
    // Liste des etudiants inscrits
}
