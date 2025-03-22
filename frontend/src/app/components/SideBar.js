import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaArchive,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";

const SideBar = ({ setSelectedMenu }) => {
  const [activeMenu, setActiveMenu] = useState("");

  const menuItems = [
    { name: "Session", icon: <FaClipboardList />, path: "/session" },
    { name: "Parcours", icon: <FaBook />, path: "/parcours" },
    { name: "Étudiants", icon: <FaUsers />, path: "/etudiants" },
    { name: "Matières", icon: <FaBook />, path: "/matieres" },
    { name: "Examens", icon: <FaClipboardList />, path: "/examens" },
    { name: "Archives", icon: <FaArchive />, path: "/archives" },
    { name: "Paramètres", icon: <FaCog />, path: "/parametres" },
  ];

  return (
    <aside className="w-64 bg-blue-500 text-white h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">GEE - UL</h1>
      <ul className="space-y-4 flex-1">
        {menuItems.map((item) => (
          <li key={item.name}>
            <button
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition 
                ${
                  activeMenu === item.name
                    ? "bg-white text-blue-500 font-bold shadow-md"
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
      </ul>
      <button className="p-3 bg-red-500 flex items-center justify-center space-x-2 rounded-lg hover:bg-red-600 transition">
        <FaSignOutAlt />
        <span>Se déconnecter</span>
      </button>
    </aside>
  );
};

export default SideBar;
