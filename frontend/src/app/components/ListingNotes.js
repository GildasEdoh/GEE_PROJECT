import { useState, useEffect } from "react";
import NoteService from "@/services/NoteService";

const ListingNotes = ({ idEvaluation }) => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!idEvaluation) {
            setError("L'évaluation sélectionnée est invalide.");
            setIsLoading(false);
            return;
        }

        NoteService.getNotesParEvaluation(idEvaluation)
            .then((response) => {
                const notesData = response?.data;
                if (Array.isArray(notesData)) {
                    setNotes(notesData);
                    setError(null);
                } else {
                    setError("Format de données inattendu.");
                    setNotes([]);
                }
            })
            .catch((err) => {
                console.error("Erreur API :", err);
                setError("Erreur lors de la récupération des notes.");
                setNotes([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [idEvaluation]);

    const imprimerListe = () => {
        window.print();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <div className="w-11/12 max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-lg font-bold text-center mb-6">
                    Liste des notes pour l'évaluation
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
                        <p className="text-center text-gray-600">Chargement...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 text-red-700 rounded-lg shadow-md text-center p-4">
                        ⚠️ {error}
                    </div>
                ) : notes.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">
                        Aucune note trouvée pour cette évaluation.
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse mt-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-center">Nom</th>
                                <th className="px-4 py-2 text-center">Prénom</th>
                                <th className="px-4 py-2 text-center">Évaluation</th>
                                <th className="px-4 py-2 text-center">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="px-4 py-2 text-center">{note.nom_etudiant}</td>
                                    <td className="px-4 py-2 text-center">{note.prenom_etudiant}</td>
                                    <td className="px-4 py-2 text-center">{note.evaluation}</td>
                                    <td className="px-4 py-2 text-center font-semibold">{note.note}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="flex justify-center gap-4 mt-6 no-print">
                    <button
                        onClick={imprimerListe}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                    >
                        Imprimer la liste
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListingNotes;
