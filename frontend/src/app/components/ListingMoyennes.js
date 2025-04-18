import { useState, useEffect } from "react";
import EtudiantService from "@/services/EtudiantService"; // Assure-toi que le service appelle cette méthode

const ListingMoyennes = () => {
    const [moyennes, setMoyennes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        EtudiantService.getMoyennesParEtudiantSession()
            .then((response) => {
                setMoyennes(response.data);
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

    // Regrouper par session
    const sessionsGroupees = moyennes.reduce((acc, item) => {
        if (!acc[item.session]) acc[item.session] = [];
        acc[item.session].push(item);
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
                    ⚠️ Erreur lors du chargement des moyennes.
                </div>
            </div>
        );
    }

    return (
        <div className="ml-64 mt-15 p-6 w-2/3 print:ml-0 print:mt-0 print:w-full">
            <div className="rounded-lg border border-gray-200 shadow-md p-4">
                <h2 className="text-lg font-bold text-center m-4">Moyennes par étudiant et session</h2>

                {Object.entries(sessionsGroupees).map(([session, liste], index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-md font-semibold mb-2 border-b pb-1">{session}</h3>
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-gray-700 text-sm text-center">Nom</th>
                                    <th className="px-4 py-2 text-gray-700 text-sm text-center">Prénom</th>
                                    <th className="px-4 py-2 text-gray-700 text-sm text-center">Moyenne</th>
                                </tr>
                            </thead>
                            <tbody>
                                {liste.map((etudiant, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="px-4 py-2 text-center">{etudiant.nom_etudiant}</td>
                                        <td className="px-4 py-2 text-center">{etudiant.prenom_etudiant}</td>
                                        <td className="px-4 py-2 text-center font-semibold">{Number(etudiant.moyenne).toFixed(2)}</td>
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

export default ListingMoyennes;
