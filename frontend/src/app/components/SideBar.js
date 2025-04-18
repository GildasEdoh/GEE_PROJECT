import { useState } from "react";
import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaEdit,
  FaChartBar,
  FaWindowClose,
  FaBars,
  FaTools,
  FaHome,
  FaFile,
  FaTable,
} from "react-icons/fa";

const SideBar = ({ setSelectedMenu }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isEditionOpen, setIsEditionOpen] = useState(false);
  const [isEvaluationsOpen, setIsEvaluationsOpen] = useState(false);
  const [isStatistiquesOpen, setIsStatistiquesOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside
      className={`bg-blue-500 text-white h-screen p-4 flex z-100 flex-col fixed top-0 left-0 overflow-y-auto transition-all ${isSidebarOpen ? "w-60" : "w-20"
        }`}
    >
      <button
        className="p-2 mb-4 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer transition self-end"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaWindowClose /> : <FaBars />}
      </button>

      <h1
        className={`text-2xl font-bold mb-6 text-center transition-all ${isSidebarOpen ? "block" : "hidden"
          }`}
      >
        GEE - UL
      </h1>

      <ul className="space-y-2 flex-1">
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Accueil")}
          >
            <FaHome />
            {isSidebarOpen && <span>Accueil</span>}
          </button>
        </li>

        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Étudiants")}
          >
            <FaUsers />
            {isSidebarOpen && <span>Étudiants</span>}
          </button>
        </li>

        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Matières")}
          >
            <FaBook />
            {isSidebarOpen && <span>Matières</span>}
          </button>
        </li>

        {/* Évaluations */}
        <li>
          <button
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsEvaluationsOpen(!isEvaluationsOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaClipboardList />
              {isSidebarOpen && <span>Évaluations</span>}
            </div>
            {isSidebarOpen &&
              (isEvaluationsOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {isEvaluationsOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  onClick={() => setSelectedMenu("Notes")}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <FaEdit />
                  <span>Notes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedMenu("Admis")}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <FaUsers />
                  <span>Admis</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedMenu("Echoues")}
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <FaUsers />
                  <span>Échoués</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Édition */}
        <li>
          <button
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsEditionOpen(!isEditionOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaEdit />
              {isSidebarOpen && <span>Édition</span>}
            </div>
            {isSidebarOpen &&
              (isEditionOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {isEditionOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button onClick={() => setSelectedMenu("Liste des inscrits")} className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition">
                  <FaUsers />
                  <span>Liste des inscrits</span>
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedMenu("Notes par matieres")} className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition">
                  <FaFile />
                  <span>Notes par matières</span>
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedMenu("Listing des notes")} className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition">
                  <FaTable />
                  <span>Listing des notes</span>
                </button>
              </li>

              <li>
                <button onClick={() => setSelectedMenu("Relevé de notes")} className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition">
                  <FaBook />
                  <span>Relevés</span>
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedMenu("PV individuel des notes")} className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition">
                  <FaFileAlt />
                  <span>PV individuel des notes</span>
                </button>
              </li>
              <li>
                <button onClick={() => setSelectedMenu("Résultats")} className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition">
                  <FaChartBar />
                  <span>Résultats</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Statistiques */}
        <li>
          <button
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsStatistiquesOpen(!isStatistiquesOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaChartBar />
              {isSidebarOpen && <span>Statistiques</span>}
            </div>
            {isSidebarOpen &&
              (isStatistiquesOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {isStatistiquesOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  onClick={() =>
                    setSelectedMenu("Repartition notes par matiere")
                  }
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <span>Répartition des notes par matière</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    setSelectedMenu("Repartition etudiants par mentions")
                  }
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <span>Répartition des étudiants par mention</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    setSelectedMenu("Frequence resultats par matiere")
                  }
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <span>Fréquence des résultats par matière</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    setSelectedMenu("Frequence recalés par matière")
                  }
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <span>Fréquence des recalés par matière</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Paramètres */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Paramètres")}
          >
            <FaTools />
            {isSidebarOpen && <span>Paramètres</span>}
          </button>
        </li>
      </ul>

      <button className="p-3 bg-red-500 flex items-center justify-center cursor-pointer space-x-2 rounded-lg hover:bg-red-600 transition">
        <FaSignOutAlt />
        {isSidebarOpen && <span>Se déconnecter</span>}
      </button>
    </aside>
  );

  {/* Statistiques 
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Statistiques")}
          >
            <FaChartBar />
            {isSidebarOpen && <span>Statistiques</span>}
          </button>
        </li>*/}
};

export default SideBar;
