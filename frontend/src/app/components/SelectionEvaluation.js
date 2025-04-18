import { useState, useEffect } from "react";
import EvaluationService from "@/services/EvaluationService";
import ListingNotes from "./ListingNotes";

const SelectionEvaluation = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [selectedEvaluationId, setSelectedEvaluationId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        EvaluationService.getAllEvaluations()
            .then((res) => {
                console.log("Réponse complète de l'API :", res);

                // Comme la réponse est un tableau directement, on peut l'utiliser directement
                if (Array.isArray(res)) {
                    setEvaluations(res);
                } else {
                    console.warn("Format inattendu :", res);
                    setEvaluations([]);
                }
            })
            .catch((err) => {
                console.error("Erreur de chargement des évaluations", err);
                setEvaluations([]);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);


    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
                <p className="text-gray-600">Chargement des évaluations...</p>
            </div>
        );
    }

    return (
        <div className="ml-64 mt-16 p-6 w-2/3">
            <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Choisir une évaluation :</label>
                <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={selectedEvaluationId}
                    onChange={(e) => setSelectedEvaluationId(e.target.value)}
                >
                    <option value="">-- Sélectionner une évaluation --</option>
                    {evaluations.map((evalItem) => (
                        <option key={evalItem.id} value={evalItem.id}>
                            {evalItem.libelle}
                            {evalItem.matiere ? ` — ${evalItem.matiere.nom}` : ""}
                            {evalItem.session ? ` (${evalItem.session.nom})` : ""}
                        </option>
                    ))}
                </select>
            </div>

            {selectedEvaluationId && (
                <ListingNotes idEvaluation={selectedEvaluationId} />
            )}
        </div>
    );
};

export default SelectionEvaluation;
