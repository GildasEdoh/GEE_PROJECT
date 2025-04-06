"use client";

import { FaUser, FaSearch, FaBell, FaSms } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [year, setYear] = useState("2024-2025");
  const [session, setSession] = useState("Normale");

  return (
    <nav className="bg-blue-400 p-4 flex items-center justify-end gap-x-6 fixed top-0 right-0 left-0">
      {/* Barre de recherche */}
      <div className="relative w-1/4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full px-3 py-1 rounded-lg border-none bg-white focus:outline-none"
        />
        <span className="absolute right-3 top-2 text-gray-500">
          <FaSearch />
        </span>
      </div>
      {/* Icone de messagerie */}
      <div>
        <button
          className="w-full flex items-center space-x-3 p-2 rounded-lg cursor-pointer"
          onClick={() => setSelectedMenu()}
        >
          <FaSms />
        </button>
      </div>

      {/* Sélecteur de session */}
      <div className="flex items-center space-x-2">
        <span className="text-white font-bold text-sm">Session</span>
        <select
          value={session}
          onChange={(e) => {
            setSession(e.target.value);
          }}
          className="px-2 py-1/2 rounded border-none bg-white focus:outline-none text-sm"
        >
          <option>Normale</option>
          <option>Rattrapage</option>
        </select>
      </div>

      {/* Sélecteur d'année */}
      <div className="flex items-center space-x-2">
        <span className="text-white font-bold text-sm">Année</span>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-2 py-1/2 rounded border-none bg-white focus:outline-none text-sm"
        >
          <option>2024-2025</option>
          <option>2023-2024</option>
          <option>2022-2023</option>
        </select>
      </div>
      {/* Icone de Notification */}
      <div>
        <button
          className="w-full flex items-center space-x-3 p-2 rounded-lg cursor-pointer"
          onClick={() => setSelectedMenu()}
        >
          <FaBell />
        </button>
      </div>
      {/* Icône Profil */}
      <div className="flex items-center flex-col space-x-2 text-white gap-y-1 cursor-pointer">
        <span className="text-xl">
          <FaUser />
        </span>
        <span className="text-sm font-bold">Compte</span>
      </div>
    </nav>
  );
};

export default Navbar;
