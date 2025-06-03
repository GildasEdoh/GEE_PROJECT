'use client';
import { useState } from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiAward, FiBook, FiUsers, FiXCircle, FiChevronLeft } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Statistique = () => {
  // Données pour le graphique
    const [activeTable, setActiveTable] = useState(null);

    // Données pour les tableaux détaillés
    const tableauxDetails = {
        "Répartitions des notes/Matière": {
            title: "Répartition des notes par matière",
            headers: [
                "MATIÈRES",
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "EFF",
                "MOYENNE",
                "ÉCART-TYPE"
            ],
            rows: [
                {
                    values: [
                        "Introduction générale",
                        "0", "0", "0", "1", "0", "1", "1", "1", "4", "0",
                        "3", "1", "2", "1", "2", "1", "3", "3", "0", "0", "0",
                        "24",
                        "16.11.38",
                        "4.08"
                    ]
                },
                {
                    values: [
                        "Droit Constitutionnel",
                        "0", "0", "0", "2", "4", "1", "5", "2", "0", "0",
                        "0", "1", "3", "0", "2", "3", "0", "1", "0", "0", "0",
                        "24",
                        "10.8.67",
                        "4.52"
                    ]
                },
                {
                    values: [
                        "Droit de la famille",
                        "0", "1", "2", "1", "0", "4", "2", "1", "1", "0",
                        "0", "1", "1", "1", "1", "1", "0", "0", "0", "0", "0",
                        "22",
                        "10.8.41",
                        "4.51"
                    ]
                },
                {
                    values: [
                        "Finances Publiques",
                        "0", "0", "0", "0", "0", "0", "0", "0", "1", "1",
                        "2", "5", "2", "5", "3", "1", "1", "2", "0", "0", "0",
                        "23",
                        "19.11.54",
                        "2.34"
                    ]
                },
                {
                    values: [
                        "Economie Politique",
                        "0", "0", "1", "1", "0", "2", "2", "4", "0", "1",
                        "1", "1", "3", "1", "2", "2", "2", "1", "0", "0", "0",
                        "23",
                        "12.9.57",
                        "4.05"
                    ]
                },
                {
                    values: [
                        "Droit Commercial",
                        "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
                        "0", "0", "1", "1", "1", "1", "1", "1", "3", "1", "3",
                        "23",
                        "23.17.30",
                        "2.66"
                    ]
                }
            ],
            footer: [
                { label: "Note", value: "Les moyennes sont arrondies vers le haut et les autres valeurs vers le bas" 
                    
                }
            ]
        },
    
    "Répartitions des étudiants/Mention": {
        title: "Répartition des étudiants par mention",
            headers: ["Mention", "Note", "Nombre", "%"],
                rows: [
                    { values: ["Médiocre", "0-7.99", "3", "12.50"] },
                    { values: ["Faible", "8-9.99", "4", "16.67"] },
                    { values: ["Passable", "10-11.99", "7", "29.17"] },
                    { values: ["Assez Bien", "12-13.99", "9", "37.50"] },
                    { values: ["Bien", "14-15.99", "1", "4.17"] },
                    { values: ["Très Bien", "16-17.99", "1", "4.17"] },
                    { values: ["Honorable", "18-20", "0", "0.00"] }
                ],
                    footer: [
                        { label: "NB Compos", value: "24" },
                        { label: "NB Admis", value: "17 (70.83%)" },
                        { label: "Moyenne promotion", value: "10.76" }
                    ]
    },
    "Fréquences des récalés /Matière": {
        title: "Fréquence des recalés par matière",
            headers: ["MATIÈRES", "RECALÉS", "ABSENTS", "TOTAL"],
                rows: [
                    {
                        values: [
                            "Introduction générale au droit",
                            "5",
                            "0",
                            "5"
                        ]
                    },
                    {
                        values: [
                            "Droit Constitutionnel",
                            "6",
                            "0",
                            "6"
                        ]
                    }
                    // Vous pouvez ajouter d'autres matières ici
                ],
                    footer: [
                        { label: "Total recalés", value: "11" },
                        { label: "Total absents", value: "0" },
                        { label: "Moyenne de recalés", value: "5.5 par matière" }
                    ]
    },
    "Fréquences des résultats /Matière": {
        title: "Fréquence des résultats par Unité d'Enseignement",
            headers: ["UNITÉS D'ENSEIGNEMENT", "NOTES ≥10.00", "NOTES <10.00", "ABSENTS", "TOTAL"],
                rows: [
                    {
                        values: [
                            "SBML - Introduction générale au droit",
                            "2",
                            "5",
                            "0",
                            "7"
                        ]
                    },
                    {
                        values: [
                            "SBML - Droit Constitutionnel",
                            "1",
                            "6",
                            "0",
                            "7"
                        ]
                    },
                    {
                        values: [
                            "SBM2 - Droit de la famille",
                            "0",
                            "5",
                            "2",
                            "7"
                        ]
                    },
                    {
                        values: [
                            "SBM2 - Finances Publiques",
                            "2",
                            "4",
                            "1",
                            "7"
                        ]
                    },
                    {
                        values: [
                            "SBM2 - Economie Politique",
                            "2",
                            "4",
                            "1",
                            "7"
                        ]
                    },
                    {
                        values: [
                            "SBM2 - Droit Commercial",
                            "6",
                            "0",
                            "1",
                            "7"
                        ]
                    }
                ],
                    footer: [
                        { label: "Total notes ≥10", value: "13" },
                        { label: "Total notes <10", value: "24" },
                        { label: "Taux de réussite", value: "35.14%" },
                        { label: "Taux d'absence", value: "7.14%" }
                    ]
    }
};
const handleCardClick = (title) => {
    setActiveTable(tableauxDetails[title]);
};

const handleBackClick = () => {
    setActiveTable(null);
};

// ... (le reste de vos données chartData, options, statsData reste inchangé)
const chartData = {
    labels: ['Droit civil', 'Droit commercial', 'Droit constitutionnel', 'Droit international', 'Droit pénal', 'Histoire du droit', 'Introduction au droit', 'Procédure civile', 'Science politique', 'Anglais juridique'],
    datasets: [
        {
            label: 'Taux de réussite (%)',
            data: [85, 72, 91, 68, 20, 18, 75, 60, 50, 40],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Moyenne /20',
            data: [14.5, 12.8, 15.2, 11.9, 10.0, 9.5, 13.0, 11.0, 10.5, 9.0],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ]
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Performance par matière',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 100
        }
    }
};

// Données statistiques simulées
const statsData = {
    general: [
        { title: "Répartitions des notes/Matière", icon: <FiUsers className="text-blue-500" />},
        { title: "Répartitions des étudiants/Mention", icon: <FiBook className="text-green-500" />},
        { title: "Fréquences des récalés /Matière", icon: <FiAward className="text-yellow-500" />},
        { title: "Fréquences des résultats /Matière", icon: <FiXCircle className="text-red-500" />},
    ],
    parMatiere: [
        { matiere: "Droit civil", reussite: "85%", moyenne: "14.5" },
        { matiere: "Droit commercial", reussite: "72%", moyenne: "12.8" },
        { matiere: "Droit constitutionnel", reussite: "91%", moyenne: "15.2" },
        { matiere: "Droit international", reussite: "68%", moyenne: "11.9" },
        { matiere: "Droit pénal", reussite: "20%", moyenne: "10.0" },
        { matiere: "Histoire du droit", reussite: "18%", moyenne: "9.5" },
        { matiere: "Introduction au droit", reussite: "75%", moyenne: "13.0" },
        { matiere: "Procédure civile", reussite: "60%", moyenne: "11.0" },
        { matiere: "Science politique", reussite: "50%", moyenne: "10.5" },
        { matiere: "Anglais juridique", reussite: "40%", moyenne: "9.0" }
    ]
};

if (activeTable) {
    return (
        <div className="h-[calc(100vh-5rem)] overflow-y-auto p-6 bg-gray-100">
            <button
                onClick={handleBackClick}
                className="flex items-center mb-4 text-blue-600 hover:text-blue-800"
            >
                <FiChevronLeft className="mr-1" /> Retour aux statistiques
            </button>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">{activeTable.title}</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {activeTable.headers.map((header, index) => (
                                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {activeTable.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.values.map((value, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {activeTable.footer && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeTable.footer.map((item, index) => (
                            <div key={index} className="bg-gray-50 p-3 rounded">
                                <span className="font-medium">{item.label}: </span>
                                <span>{item.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
  return (
    <div className="flex flex-col p-4 bg-gray-100">
        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.general.map((stat, index) => (
                <button
                    key={index}
                    type="button"
                    className="bg-white rounded-xl shadow-md p-6 flex items-start text-left hover:shadow-lg transition duration-200 cursor-pointer"
                    onClick={() => handleCardClick(stat.title)}
                >
                    <div className="p-3 rounded-full bg-gray-100 mr-4">
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                    </div>
                </button>
            ))}
        </div>

        {/* ... (le reste de votre code original avec le graphique et le tableau) ... */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Performance par matière</h2>
            </div>
            <div className="h-134">
                <Bar data={chartData} options={options} />
            </div>
        </div>

        {/* Tableau des statistiques */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matière</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux de réussite</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moyenne générale</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {statsData.parMatiere.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{item.matiere}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-2 bg-gray-200 rounded-full w-32 mr-2">
                                        <div
                                            className="h-2 rounded-full bg-blue-500"
                                            style={{ width: item.reussite }}
                                        />
                                    </div>
                                    <span>{item.reussite}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.moyenne}/20</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer">
                                    Voir détail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Statistique;
