"use client";

import { useState } from "react";
import { FaUserGraduate, FaBook, FaPencilAlt, FaArchive, FaCogs, FaSignOutAlt } from "react-icons/fa";

const SideBar = () => {
  const [active, setActive] = useState("Étudiants");

  const menuItems = [
    { name: "Session", icon: "📅" },
    { name: "Parcours", icon: "📂" },
    { name: "Étudiants", icon: <FaUserGraduate /> },
    { name: "Matières", icon: <FaBook /> },
    { name: "Editions", icon: <FaPencilAlt /> },
    { name: "Archives", icon: <FaArchive /> },
    { name: "Paramètres", icon: <FaCogs /> },
  ];

  return (
    <aside className="w-64 bg-blue-500 text-white h-screen p-4">
      {/* Titre */}
      <h1 className="text-2xl font-bold mb-6">GEE - UL</h1>

      {/* Menu */}
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
              active === item.name ? "bg-blue-700" : "hover:bg-blue-600"
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-lg">{item.name}</span>
          </li>
        ))}
      </ul>

      {/* Bouton de déconnexion */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-2 cursor-pointer hover:text-gray-300">
        <FaSignOutAlt />
        <span>Se déconnecter</span>
      </div>
    </aside>
  );
};

export default SideBar;
