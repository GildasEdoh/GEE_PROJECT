import { useState, useEffect } from "react";
import NoteService from "@/services/NoteService";

const RepartitionNoteParMatiere = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        NoteService.getnotesParMatiereEtudiant()
            .then((response) => {
                setNotes(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setError(true);
            });
    }, []);

    const imprimerListe = () => {
        window.print();
    };

    const notesGroupees = notes.reduce((acc, note) => {
        if (!acc[note.matiere]) acc[note.matiere] = [];
        acc[note.matiere].push(note);
        return acc;
    }, {});

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ml-64 mt-20 w-2/3">
                <div className="bg-red-100 text-red-700 h-50 rounded shadow-md text-center text-3xl">
                    ⚠️ Erreur lors du chargement des notes.
                </div>
            </div>
        );
    }

    return (
        <div className="ml-64 mt-15 p-6 w-2/3 print:ml-0 print:mt-0 print:w-full">
            <div className="rounded-lg border border-gray-200 shadow-md p-4">
                <h2 className="text-lg font-bold text-center m-4">Notes par matière</h2>

                {Object.entries(notesGroupees).map(([matiere, notesMatiere], index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-md font-semibold mb-2 border-b pb-1">{matiere}</h3>
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-gray-700 text-sm text-center">Etudiant</th>

                                    <th className="px-4 py-2 text-gray-700 text-sm text-center">Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notesMatiere.map((note, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="px-4 py-2 text-center">{note.etudiant}</td>

                                        <td className="px-4 py-2 text-center font-semibold">{note.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-6 no-print">
                <button
                    onClick={imprimerListe}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                >
                    Imprimer la liste
                </button>
            </div>
        </div>
    );
};

export default RepartitionNoteParMatiere;
