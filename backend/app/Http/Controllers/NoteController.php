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
}
