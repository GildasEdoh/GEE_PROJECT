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
} from "react-icons/fa";

const SideBar = ({ setSelectedMenu }) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const menuItems = [
    { name: "Étudiants", icon: <FaUsers />, path: "/etudiants" },
    { name: "Matières", icon: <FaBook />, path: "/matieres" },
    { name: "Évaluations", icon: <FaClipboardList />, path: "/evaluations" },
    { name: "Statistiques", icon: <FaClipboardList />, path: "/statistiques" },
    { name: "Archives", icon: <FaArchive />, path: "/archives" },
  ];

  return (
    <aside className="w-55 bg-blue-400 text-white h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">GEE - UL</h1>
      
      <ul className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition 
                ${
                  activeMenu === item.name
                    ? "bg-blue-600 text-white-500 font-bold shadow-md"
                    : "hover:bg-blue-600"
                }`}
              onClick={() => {
                setActiveMenu(item.name);
                setSelectedMenu(item.name);
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          </li>
        ))}

        {/* Menu Notes avec Sous-menus */}
        <li>
          <button
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setIsNotesOpen(!isNotesOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaClipboardList className="text-lg" />
              <span>Notes</span>
            </div>
            {isNotesOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isNotesOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Saisir Note")}
                >
                  <FaFileAlt />
                  <span>Saisir</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Édition Note")}
                >
                  <FaEdit />
                  <span>Édition</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setSelectedMenu("Relevés de notes")}
                >
                  <FaClipboardCheck />
                  <span>Relevés de notes</span>
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>

      <button className="p-3 bg-red-500 flex items-center justify-center space-x-2 rounded-lg hover:bg-red-600 transition">
        <FaSignOutAlt />
        <span>Se déconnecter</span>
      </button>
    </aside>
  );
};

export default SideBar;
