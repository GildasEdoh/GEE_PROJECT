import { useState, useEffect } from "react";
import NoteService from "@/services/NoteService";

const PVnotes = () => {
    const [notes, setNotes] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        NoteService.getListing()
            .then((response) => {
                setNotes(response.data);  // Directement utiliser les données groupées
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                setError(true);
            });
    }, []);

    const imprimerPV = () => {
        window.print();
    };

    return (
        <div className="ml-64 mt-10 p-6 w-2/3 print:ml-0 print:mt-0 print:w-full">
            <div className="rounded-lg border border-gray-300 shadow-md p-4 bg-white">
                <h2 className="text-xl font-bold text-center mb-4">
                    Procès-verbal des notes admissibles
                </h2>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 text-red-700 p-4 rounded shadow text-center">
                        ❌ Erreur lors du chargement des notes.
                    </div>
                ) : Object.keys(notes).length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">
                        Aucun étudiant admissible trouvé.
                    </div>
                ) : (
                    Object.keys(notes).map((evaluationKey) => (
                        <div key={evaluationKey} className="mb-6">
                            <h3 className="text-lg font-bold text-center mb-4">
                                Évaluation: {evaluationKey}
                            </h3>
                            {Object.keys(notes[evaluationKey]).map((matiereKey) => {
                                const dataArray = notes[evaluationKey][matiereKey]; // Données de la matière

                                return (
                                    <div key={matiereKey} className="mb-4">
                                        <h4 className="text-md font-semibold text-center mb-4">
                                            Matière: {matiereKey}
                                        </h4>
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-2 text-sm text-center">Nom</th>
                                                    <th className="px-4 py-2 text-sm text-center">Prénom</th>
                                                    <th className="px-4 py-2 text-sm text-center">Note</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataArray.map((note, i) => (
                                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                        <td className="px-4 py-2 text-center">{note.nom_etudiant}</td>
                                                        <td className="px-4 py-2 text-center">{note.prenom_etudiant}</td>
                                                        <td className="px-4 py-2 text-center font-semibold">{note.note}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })}
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center mt-6 no-print">
                <button
                    onClick={imprimerPV}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    🖨️ Imprimer le PV
                </button>
            </div>
        </div>
    );
};

export default PVnotes;
