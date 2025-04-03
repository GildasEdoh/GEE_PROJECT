"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import du composant Avatar

const Navbar = () => {
  const [year, setYear] = useState("2024-2025");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = {
    avatar: "https://via.placeholder.com/100", // Remplace par l'URL de l'image de profil
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    status: "Administrateur",
  };
  
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
      <div className="flex items-center space-x-2 text-white cursor-pointer"
       onClick={() => setIsProfileOpen(true)}>
        <span className="text-xl">👤</span>
        <span>Compte</span>
      </div>

          {/* Fenêtre latérale */}
          {isProfileOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-70 h-80 bg-white shadow-lg p-4"
        >
          <button
            className="text-red-500 font-bold text-lg absolute top-2 right-4"
            onClick={() => setIsProfileOpen(false)}
          >
            ✖
          </button>

           {/* Avatar avec `shadcn/ui` */}
           <Avatar className="w-24 h-24 border-2 border-gray-300">
            <AvatarImage src={user.avatar} alt="Profil" />
            <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
          </Avatar>

          {/* Informations utilisateur */}
          <h2 className="text-xl font-semibold mt-4">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="bg-blue-200 text-blue-800 px-3 py-1 mt-2 rounded-lg text-sm">
            {user.status}
          </span>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
