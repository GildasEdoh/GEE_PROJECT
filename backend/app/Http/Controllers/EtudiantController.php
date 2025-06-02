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
    
    // Lire les étudiants par matière
   /*  public function getAllEtudiantsBySubject($idMatiere)
    {
        $anneeEnCours = "2024-2025"; 

        $etudiants = DB::table('notes as n')
        ->distinct()
        ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
        ->join('inscriptions as i', 'i.fk_etudiant', '=', 'et.numero_carte')
        ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
        ->join('evaluation_matiere as em', 'e.id', '=', 'em.fk_evaluation')
        ->join('matieres as m', 'em.fk_matiere', '=', 'm.id')
        ->where('m.id', $idMatiere)
        ->where('i.annee', $anneeEnCours)
        ->select(
            'et.numero_carte',   // ✅ numéro de carte avec son vrai nom
            'et.nom',
            'et.prenom',
            'et.sexe',           // ✅ ajout du champ sexe
            'm.libelle as matiere',
            'i.annee'
        )
        ->get();
        return response()->json($etudiants);
    } */
    public function getAllEtudiantsBySubject($idMatiere)
    {
        $idEtablissement = 1;
        $idFiliere = 1;
        $idParcours = 1;
        $idAnneeEtude = 1;
        $idAnneeUniv = 2;
        $idTypeEvaluation = 1;

        $etudiants = DB::table('etudiants as e')
            ->join('inscriptions as i', 'i.fk_etudiant', '=', 'e.numero_carte')
            ->join('parcours_annees_etude as pae', 'i.fk_parcours_annee_etude', '=', 'pae.id')
            ->join('parcours as p', 'pae.fk_parcours', '=', 'p.id')
            ->join('filieres as f', 'p.fk_filiere', '=', 'f.id')
            ->join('etablissements as etab', 'f.fk_etablissement', '=', 'etab.id')
            ->join('annees_etude as ae', 'pae.fk_annee_etude', '=', 'ae.id')
            ->join('annees_universitaire as au', 'i.fk_annee_univ', '=', 'au.id')
            ->join('matieres as m', 'm.id', '=', DB::raw($idMatiere))
            
            ->join('evaluations_matieres as em', 'em.fk_matiere', '=', 'm.id')
            ->whereNotNull('em.fk_evaluation')
            
            ->join('evaluations_matieres_types as emt', 'emt.fk_evaluation_matiere', '=', 'em.id')
            ->join('types_evaluation as te', 'emt.fk_type_evaluation', '=', 'te.id')
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
    

}
