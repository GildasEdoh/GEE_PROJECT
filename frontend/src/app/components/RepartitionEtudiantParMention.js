import { useState, useEffect } from "react";
import NoteService from "@/services/NoteService";

const RepartitionEtudiantParMention = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        NoteService.getMoyenneEtMentionParEtudiant()
            .then((response) => {
                console.log("DATA REÇUE :", response.data);  // Assurez-vous que la clé 'data' existe bien dans la réponse
                setEtudiants(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setError(true);
                setIsLoading(false);
            });
    }, []);

    const imprimerListe = () => {
        window.print();
    };

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
                    ⚠️ Erreur lors du chargement des moyennes.
                </div>
            </div>
        );
    }

    if (etudiants.length === 0) {
        return (
            <div className="ml-64 mt-20 w-2/3">
                <div className="bg-yellow-100 text-yellow-700 h-50 rounded shadow-md text-center text-3xl">
                    Aucun étudiant trouvé.
                </div>
            </div>
        );
    }

    return (
        <div className="ml-64 mt-15 p-6 w-2/3 print:ml-0 print:mt-0 print:w-full">
            <div className="rounded-lg border border-gray-200 shadow-md p-4">
                <h2 className="text-lg font-bold text-center m-4">Moyennes & Mentions des Étudiants</h2>

                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-gray-700 text-sm text-center">N° Carte</th>
                            <th className="px-4 py-2 text-gray-700 text-sm text-center">Nom</th>
                            <th className="px-4 py-2 text-gray-700 text-sm text-center">Prénom</th>
                            <th className="px-4 py-2 text-gray-700 text-sm text-center">Moyenne</th>
                            <th className="px-4 py-2 text-gray-700 text-sm text-center">Mention</th>
                        </tr>
                    </thead>
                    <tbody>
                        {etudiants.map((etudiant, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="px-4 py-2 text-center">{etudiant.etudiant}</td>
                                <td className="px-4 py-2 text-center">{etudiant.nom}</td>
                                <td className="px-4 py-2 text-center">{etudiant.prenom}</td>
                                <td className="px-4 py-2 text-center font-semibold">
                                    {parseFloat(etudiant.moyenne).toFixed(2)}
                                </td>
                                <td className="px-4 py-2 text-center">{etudiant.mention}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default RepartitionEtudiantParMention;
