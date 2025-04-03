<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    /**
     * Afficher la liste des notes.
     */
    public function index()
    {
        $notes = Note::all();
        return response()->json($notes);
    }

    /**
     * Enregistrer une nouvelle note.
     */
    public function store(Request $request)
    {
        $request->validate([
            'etudiant_id' => 'required|exists:etudiants,id',
            'matiere_id' => 'required|exists:matieres,id',
            'valeur' => 'required|numeric|min:0|max:20',
        ]);

        $note = Note::create([
            'etudiant_id' => $request->etudiant_id,
            'matiere_id' => $request->matiere_id,
            'valeur' => $request->valeur,
        ]);

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
        $note = Note::find($id);

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
            'valeur' => 'required|numeric|min:0|max:20',
        ]);

        $note->update([
            'valeur' => $request->valeur
        ]);

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
}
