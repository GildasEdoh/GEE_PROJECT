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
    
    // Lire les étudiants par matière
   
    public function getAllEtudiantsBySubject($idMatiere)
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
}

}
