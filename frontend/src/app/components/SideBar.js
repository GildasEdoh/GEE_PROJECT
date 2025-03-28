import { useState } from "react";
import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaArchive,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaEdit,
  FaClipboardCheck,
  FaChartBar,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";

const SideBar = ({ setSelectedMenu }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isMiseAJourOpen, setIsMiseAJourOpen] = useState(false);
  const [isEvaluationsOpen, setIsEvaluationsOpen] = useState(false);

  return (
    <aside className="w-64 bg-blue-500 text-white h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">GEE - UL</h1>

      <ul className="space-y-2 flex-1">
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Accueil")}
          >
            <span className="text-lg">🏠</span>
            <span>Accueil</span>
          </button>
        </li>

        {/* Étudiants */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Étudiants")}
          >
            <FaUsers />
            <span>Étudiants</span>
          </button>
        </li>

        {/* Matières */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Matières")}
          >
            <FaBook />
            <span>Matières</span>
          </button>
        </li>

        {/* Évaluations avec sous-menus */}
        <li>
          <button
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsEvaluationsOpen(!isEvaluationsOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaClipboardList />
              <span>Évaluations</span>
            </div>
            {isEvaluationsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isEvaluationsOpen && (
            <ul className="ml-6 space-y-2">
              {/* <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Évaluations Notes")}
                >
                  <FaFileAlt />
                  <span>Notes</span>
                </button> */}

              {/* Notes avec sous-menus */}
              <li>
                <button
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setIsNotesOpen(!isNotesOpen)}
                >
                  <div className="flex items-center space-x-3">
                    <FaClipboardList />
                    <span>Notes</span>
                  </div>
                  {isNotesOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {isNotesOpen && (
                  <ul className="ml-6 space-y-2">
                    <li>
                      <button
                        className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => setSelectedMenu("Édition Notes")}
                      >
                        <FaEdit />
                        <span>Édition</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                        onClick={() => setSelectedMenu("Relevés de Notes")}
                      >
                        <FaClipboardCheck />
                        <span>Relevées</span>
                      </button>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Évaluations Admis")}
                >
                  <FaUserCheck />
                  <span>Admis</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Évaluations Échoués")}
                >
                  <FaUserTimes />
                  <span>Échoués</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Mise à jour avec sous-menus */}
        <li>
          <button
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsMiseAJourOpen(!isMiseAJourOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaArchive />
              <span>Mise à jour</span>
            </div>
            {isMiseAJourOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isMiseAJourOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Mise à jour Notes")}
                >
                  <FaFileAlt />
                  <span>Notes</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Mise à jour Étudiants")}
                >
                  <FaUsers />
                  <span>Étudiants</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Mise à jour Matières")}
                >
                  <FaBook />
                  <span>Matières</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Statistiques */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Statistiques")}
          >
            <FaChartBar />
            <span>Statistiques</span>
          </button>
        </li>

        {/* Paramètres */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Paramètres")}
          >
            ⚙️
            <span>Paramètres</span>
          </button>
        </li>
      </ul>

      {/* Déconnexion */}
      <button className="p-3 bg-red-500 flex items-center justify-center space-x-2 rounded-lg hover:bg-red-600 transition">
        <FaSignOutAlt />
        <span>Se déconnecter</span>
      </button>
    </aside>
  );
};

export default SideBar;
