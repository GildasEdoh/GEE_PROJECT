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
} from "react-icons/fa";

/**
 * 
 */

const SideBar = ({ setSelectedMenu }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isEditionOpen, setIsEditionOpen] = useState(false);
  const [isEvaluationsOpen, setIsEvaluationsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside
      className={`bg-blue-500 text-white h-screen p-4 flex z-100 flex-col fixed top-0 left-0 overflow-y-auto transition-all ${
        isSidebarOpen ? "w-60" : "w-20"
      }`}
    >
      <button
        className="p-2 mb-4 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer transition self-end"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaWindowClose /> : <FaBars />}
      </button>

      <h1
        className={`text-2xl font-bold mb-6 text-center transition-all ${
          isSidebarOpen ? "block" : "hidden"
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
            <span className="text-lg">
              <FaHome />
            </span>
            {isSidebarOpen && <span>Accueil</span>}
          </button>
        </li>

        {/* Étudiants */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Étudiants")}
          >
            <FaUsers />
            {isSidebarOpen && <span>Étudiants</span>}
          </button>
        </li>

        {/* Matières */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setSelectedMenu("Matières")}
          >
            <FaBook />
            {isSidebarOpen && <span>Matières</span>}
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
              {isSidebarOpen && <span>Évaluations</span>}
            </div>
            {isSidebarOpen &&
              (isEvaluationsOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {isEvaluationsOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Notes")}
                >
                  <FaEdit />
                  <span>Notes</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Admis")}
                >
                  <FaUsers />
                  <span>Admis</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Echoues")}
                >
                  <FaUsers />
                  <span>Echoues</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Edition avec sous-menus */}
        <li>
          <button
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsEditionOpen(!isEditionOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaEdit />
              {isSidebarOpen && <span>Edition</span>}
            </div>
            {isSidebarOpen &&
              (isEditionOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {isEditionOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu()}
                >
                  <FaUsers />
                  <span>Liste des inscrits</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu()}
                >
                  <FaFile />
                  <span>Notes par Matières</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu()}
                >
                  <FaFileAlt />
                  <span>PV individuels de notes</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu()}
                >
                  <FaBook />
                  <span>Releves</span>
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
            {isSidebarOpen && <span>Statistiques</span>}
          </button>
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
};

export default SideBar;
