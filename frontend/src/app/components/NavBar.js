"use client";

import { useState } from "react";

const Navbar = () => {
  const [year, setYear] = useState("2024-2025");

  return (
    <nav className="bg-blue-500 p-4 flex items-center justify-end gap-x-8">
      {/* Barre de recherche */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full px-4 py-2 rounded-lg border bg-white focus:outline-none"
        />
        <span className="absolute right-3 top-2 text-gray-500">🔍</span>
      </div>

      {/* Sélecteur d'année */}
      <div className="flex items-center space-x-2">
        <span className="text-white font-semibold">Année</span>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-2 py-1 rounded border bg-white focus:outline-none"
        >
          <option>2024-2025</option>
          <option>2023-2024</option>
          <option>2022-2023</option>
        </select>
      </div>

      {/* Icône Profil */}
      <div className="flex items-center space-x-2 text-white cursor-pointer">
        <span className="text-xl">👤</span>
        <span>Compte</span>
      </div>
    </nav>
  );
};

export default Navbar;
