<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    /**
     * Afficher la liste des notes.
     */
    public function index()
    {
        $notes = Note::with(['evaluation', 'etudiant'])->get();
        return response()->json($notes);
    }

    /**
     * Enregistrer une nouvelle note.
     */
    public function store(Request $request)
    {
        $request->validate([
            'fk_etudiant' => 'required|exists:etudiants,id',
            'fk_evaluation' => 'required|exists:evaluations,id',
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



    public function listeNotes1()
    {
        $notes = DB::table('notes as n')
            ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
            ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
            ->join('evaluation_matiere as em', 'e.id', '=', 'em.fk_evaluation')
            ->join('matieres as m', 'em.matiere', '=', 'm.id')
            ->select(
                'm.libelle AS matiere',
                'et.nom AS nom_etudiant',
                'et.prenom AS prenom_etudiant',
                'n.valeur AS note'
            )
            ->orderBy('et.nom') // tri optionnel
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $notes
        ]);
    }

    //	Notes par matière : Détails des notes par matière.
    public function listeNotes()
    {
        try {
            $notes = DB::table('notes as n')
                ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
                ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
                ->join('evaluation_matiere as em', 'e.id', '=', 'em.fk_evaluation')
                ->join('matieres as m', 'em.fk_matiere', '=', 'm.id')
                ->select(
                    'm.libelle AS matiere',
                    'et.nom AS nom_etudiant',
                    'et.prenom AS prenom_etudiant',
                    'n.valeur AS note'
                )
                ->orderBy('m.libelle')
                ->orderBy('et.nom')
                ->get();

            return response()->json([
                'data' => $notes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'line' => $e->getLine()
            ], 500);
        }
    }


    // Listing des notes : Tableau complet des notes pour une évaluation donnée.
    public function listeNotesParEvaluation($id)
    {
        try {
            $notes = DB::table('notes as n')
                ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
                ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
                ->where('e.id', $id)
                ->select(
                    'et.numero_carte as numero_etudiant',
                    'et.nom as nom_etudiant',
                    'et.prenom as prenom_etudiant',
                    'n.valeur as note',
                    'e.libelle as evaluation'
                )
                ->get();

            return response()->json([
                'data' => $notes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    //Procès-verbal des notes : PV officiel des notes validées.

    public function listeNotesAdmissibles()
    {
        $notes = DB::table('notes as n')
            ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
            ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
            ->join('evaluation_matiere as em', 'e.id', '=', 'em.fk_evaluation')
            ->join('matieres as m', 'em.fk_matiere', '=', 'm.id')
            ->where('n.valeur', '>=', 10)
            ->select(
                'et.nom as nom_etudiant',
                'et.prenom as prenom_etudiant',
                'n.valeur as note',
                'e.libelle as evaluation',
                'm.libelle as matiere'
            )
            ->get();

        // Grouper les résultats par évaluation et matière
        $groupedNotes = $notes->groupBy(function ($item) {
            return $item->evaluation;  // Grouper par libellé de l'évaluation
        });

        // Pour chaque évaluation, grouper par matière
        $groupedNotes = $groupedNotes->map(function ($evaluation) {
            return $evaluation->groupBy(function ($item) {
                return $item->matiere;  // Grouper par libellé de la matière
            });
        });

        return response()->json([
            'data' => $groupedNotes
        ]);
    }


    //Relevé de notes : Génération des relevés de notes individuels.

    public function notesAvecMoyenneEtudiant($numeroCarte)
    {
        $notes = DB::table('notes as n')
            ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
            ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
            ->join('evaluation_matiere as em', 'e.id', '=', 'em.fk_evaluation')
            ->join('matieres as m', 'em.fk_matiere', '=', 'm.id')
            ->join(DB::raw('(
            SELECT 
                fk_etudiant as etudiant, 
                SUM(valeur) AS total_notes,
                AVG(valeur) AS moyenne
            FROM notes
            GROUP BY fk_etudiant
        ) as tot'), 'tot.etudiant', '=', 'et.numero_carte')
            ->where('et.numero_carte', $numeroCarte)
            ->select(
                'et.nom as nom_etudiant',
                'et.prenom as prenom_etudiant',
                'm.libelle as matiere',
                'n.valeur as note',
                'e.libelle as evaluation',
                'tot.total_notes',
                DB::raw('ROUND(tot.moyenne, 2) as moyenne')
            )
            ->get();

        return response()->json($notes);
    }


    public function notesEtMoyenneEtudiant($numeroCarte)
    {
        // 1. Récupérer les notes avec les matières et les évaluations
        $notes = DB::table('notes as n')
            ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
            ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
            ->join('evaluation_matiere as em', 'e.id', '=', 'em.fk_evaluation')
            ->join('matieres as m', 'em.fk_matiere', '=', 'm.id')
            ->select(
                'm.libelle as matiere',
                'e.libelle as evaluation',
                'n.valeur as note'
            )
            ->where('et.numero_carte', $numeroCarte)
            ->get();

        // 2. Calculer la moyenne générale
        $moyenne = $notes->avg('note');

        // 3. Retourner les résultats
        return response()->json([
            'notes' => $notes,
            'moyenne' => round($moyenne, 2)
        ]);
    }


    //Répartition des notes par matière : Visualisation des distributions des notes

    public function notesParMatiereEtudiant()
    {
        $notes = DB::table('notes as n')
            ->distinct()
            ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
            ->join('evaluation_matiere as em', 'em.fk_evaluation', '=', 'e.id')
            ->join('matieres as m', 'em.fk_matiere', '=', 'm.id')
            ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
            ->select(
                'm.libelle as matiere',
                'n.valeur as note',
                'et.numero_carte as etudiant'
            )
            ->orderBy('m.libelle')
            ->orderBy('et.numero_carte')
            ->get();

        return response()->json([
            'data' => $notes
        ]);
    }

    //Répartition des étudiants par mention : Analyse des mentions obtenues par les étudiants
    public function moyenneEtMentionParEtudiant()
    {
        $etudiants = DB::table('notes as n')
            ->join('etudiants as et', 'n.fk_etudiant', '=', 'et.numero_carte')
            ->select(
                'et.numero_carte as etudiant',
                'et.nom',
                'et.prenom',
                DB::raw('AVG(n.valeur) as moyenne'),
                DB::raw("
                CASE 
                    WHEN AVG(n.valeur) >= 18 THEN 'Excellent'
                    WHEN AVG(n.valeur) >= 16 THEN 'Très Bien'
                    WHEN AVG(n.valeur) >= 14 THEN 'Bien'
                    WHEN AVG(n.valeur) >= 12 THEN 'Assez Bien'
                    WHEN AVG(n.valeur) >= 10 THEN 'Passable'
                    ELSE 'Échec'
                END as mention
            ")
            )
            ->groupBy('et.numero_carte', 'et.nom', 'et.prenom')
            ->orderByDesc('moyenne')
            ->get();

        return response()->json([
            'data' => $etudiants
        ]);
    }

    //Fréquence des résultats par matière 

    public function statistiquesParMentionParMatiere()
    {
        $stats = DB::table('notes as n')
            ->join('evaluations as e', 'n.fk_evaluation', '=', 'e.id')
            ->join('evaluation_matiere as em', 'em.fk_evaluation', '=', 'e.id')
            ->join('matieres as m', 'em.fk_matiere', '=', 'm.id')
            ->select(
                'm.libelle as matiere',
                DB::raw("CASE
                WHEN n.valeur >= 18 THEN 'Excellent'
                WHEN n.valeur >= 16 THEN 'Très Bien'
                WHEN n.valeur >= 14 THEN 'Bien'
                WHEN n.valeur >= 12 THEN 'Assez Bien'
                WHEN n.valeur >= 10 THEN 'Passable'
                ELSE 'Échec'
            END as resultat"),
                DB::raw('COUNT(*) as nombre_de_etudiants')
            )
            ->groupBy('m.libelle', 'resultat')
            ->orderBy('m.libelle')
            ->orderByDesc('nombre_de_etudiants')
            ->get();

        return response()->json($stats);
    }
}
