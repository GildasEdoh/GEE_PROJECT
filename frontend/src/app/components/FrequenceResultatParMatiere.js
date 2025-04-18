import { useEffect, useState } from "react";
import NoteService from "@/services/NoteService";

const FrequenceResultatParMatiere = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        NoteService.getstatistiquesParMentionParMatiere()
            .then((data) => {
                setEtudiants(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Erreur chargement statistiques :", err);
                setError("Impossible de charger les données.");
                setIsLoading(false);
            });
    }, []);

    const imprimerListe = () => window.print();

    // Regrouper les données par matière
    const groupByMatiere = (data) => {
        const grouped = {};
        data.forEach((item) => {
            if (!grouped[item.matiere]) {
                grouped[item.matiere] = [];
            }
            grouped[item.matiere].push(item);
        });
        return grouped;
    };

    const groupedStats = groupByMatiere(etudiants);

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
                <div className="bg-red-100 text-red-700 p-6 rounded shadow-md text-center text-xl">
                    ⚠️ {error}
                </div>
            </div>
        );
    }

    return (
        <div className="ml-64 mt-16 p-6 w-2/3 print:ml-0 print:mt-0 print:w-full">
            <div className="rounded-lg border border-gray-200 shadow-md p-4 bg-white">
                <h2 className="text-xl font-bold text-center mb-6 text-blue-700">
                     Statistiques par Mention & Matière
                </h2>

                {Object.keys(groupedStats).map((matiere, idx) => (
                    <div key={idx} className="mb-8">
                        <h3 className="text-lg font-semibold text-purple-700 text-center mb-4">
                            {matiere}
                        </h3>
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-sm">
                                <tr>
                                    <th className="px-4 py-2 text-center">Résultat</th>
                                    <th className="px-4 py-2 text-center">Nombre d'Étudiants</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedStats[matiere].map((stat, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                    >
                                        <td className="px-4 py-2 text-center">{stat.resultat}</td>
                                        <td className="px-4 py-2 text-center font-semibold">
                                            {stat.nombre_de_etudiants}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-6 no-print">
                <button
                    onClick={imprimerListe}
                    className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-200"
                >
                     Imprimer la liste
                </button>
            </div>
        </div>
    );
};

export default FrequenceResultatParMatiere;
