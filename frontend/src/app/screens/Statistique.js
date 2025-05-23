"use client";
import React from "react";
import {
  FiBarChart2,
  FiUsers,
  FiBook,
  FiAward,
  FiXCircle,
} from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistique = () => {
  // Données pour le graphique
  const chartData = {
    labels: ["Mathématiques", "Physique", "Informatique", "Chimie"],
    datasets: [
      {
        label: "Taux de réussite (%)",
        data: [85, 72, 91, 68],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Moyenne /20",
        data: [14.5, 12.8, 15.2, 11.9],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Performance par matière",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  // Données statistiques simulées
  const statsData = {
    general: [
      {
        title: "Total Étudiants",
        value: "1,245",
        icon: <FiUsers className="text-blue-500" />,
        change: "+5.2%",
      },
      {
        title: "Matières enseignées",
        value: "48",
        icon: <FiBook className="text-green-500" />,
        change: "+2",
      },
      {
        title: "Taux de réussite",
        value: "78%",
        icon: <FiAward className="text-yellow-500" />,
        change: "+3%",
      },
      {
        title: "Taux d'échec",
        value: "22%",
        icon: <FiXCircle className="text-red-500" />,
        change: "-3%",
      },
    ],
    parMatiere: [
      { matiere: "Mathématiques", reussite: "85%", moyenne: "14.5" },
      { matiere: "Physique", reussite: "72%", moyenne: "12.8" },
      { matiere: "Informatique", reussite: "91%", moyenne: "15.2" },
      { matiere: "Chimie", reussite: "68%", moyenne: "11.9" },
    ],
  };

  return (
    <div className="flex flex-col p-4 bg-gray-100">
      <div className="flex justify-between items-center p-2 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Statistiques</h1>
      </div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.general.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-md p-6 flex items-start"
          >
            <div className="p-3 rounded-full bg-gray-100 mr-4">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <div className="flex items-end">
                <p className="text-2xl font-bold mr-2">{stat.value}</p>
                <span
                  className={`text-sm ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique principal */}
      {/* <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Performance par matière</h2>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Exporter les données
                    </button>
                </div>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FiBarChart2 className="text-gray-400 text-4xl" />
                    <p className="ml-2 text-gray-500">Graphique des performances</p>
                </div>
            </div> */}

      {/* Performance par matiere */}
      <div className="bg-white rounded-md shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Performance par matière</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            Exporter les données
          </button>
        </div>
        <div className="h-64">
          <Bar data={chartData} options={options} />
        </div>
      </div>

      {/* Tableau des statistiques */}
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Matière
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Taux de réussite
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Moyenne générale
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Détails
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {statsData.parMatiere.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {item.matiere}
                </td>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.moyenne}/20
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
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
