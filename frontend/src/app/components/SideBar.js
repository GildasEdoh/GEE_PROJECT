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

const SideBar = ({ isSidebarOpen, setSelectedMenu }) => {
  const [isEditionOpen, setIsEditionOpen] = useState(false);
  const [isEvaluationsOpen, setIsEvaluationsOpen] = useState(false);

  return (
    <aside
      className={`bg-blue-500  hidden md:block text-white h-screen p-4 fixed top-13 bottom-0 left-0 z-10 overflow-y-auto`}
    >
      <ul className="flex flex-col items-start justify-between gap-3 w-full">
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
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
            className="w-full flex items-center space-x-3 text-sm p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Étudiants")}
          >
            <FaUsers />
            {isSidebarOpen && <span>Étudiants</span>}
          </button>
        </li>

        {/* Matières */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Matières")}
          >
            <FaBook />
            {isSidebarOpen && <span>Matières</span>}
          </button>
        </li>

        {/* Évaluations avec sous-menus */}
        <li className="w-full">
          <button
            className="w-full flex items-center justify-between p-3 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setIsEvaluationsOpen(!isEvaluationsOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaClipboardList />
              {isSidebarOpen && <span className="mr-3">Évaluations</span>}
            </div>
            {isSidebarOpen &&
              (isEvaluationsOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {isEvaluationsOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu("Notes")}
                >
                  <FaEdit />
                  <span>Notes</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu("Admis")}
                >
                  <FaUsers />
                  <span>Admis</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
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
            className="w-full flex items-center justify-between text-sm p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setIsEditionOpen(!isEditionOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaEdit />
              {isSidebarOpen && <span className="mr-3">Edition</span>}
            </div>
            {isSidebarOpen &&
              (isEditionOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {isEditionOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu()}
                >
                  <FaUsers />
                  <span>Liste des inscrits</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu()}
                >
                  <FaFile />
                  <span>Notes par Matières</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu()}
                >
                  <FaFileAlt />
                  <span>PV individuels de notes</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
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
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-sm hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Statistiques")}
          >
            <FaChartBar />
            {isSidebarOpen && <span>Statistiques</span>}
          </button>
        </li>

        {/* Paramètres */}
        <li className="mb-23">
          <button
            className="w-full flex items-center space-x-3 p-3 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Paramètres")}
          >
            <FaTools />
            {isSidebarOpen && <span>Paramètres</span>}
          </button>
        </li>
      </ul>
      <div className="fixed bottom-0">
        <button className="py-1 px-4 bg-red-500 flex items-center justify-center cursor-pointer space-x-1 rounded-lg hover:bg-red-600 transition-all duration-300 ease-out">
          <FaSignOutAlt />
          {isSidebarOpen && <span>Se déconnecter</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
