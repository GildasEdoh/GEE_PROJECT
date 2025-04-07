"use client";
<<<<<<< HEAD
import { motion } from "framer-motion";
=======

import { FaUser, FaSearch, FaBell, FaSms } from "react-icons/fa";
>>>>>>> dashboard/rahim
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import du composant Avatar

const Navbar = () => {
  const [year, setYear] = useState("2024-2025");
<<<<<<< HEAD
  const [isProfileOpen, setIsProfileOpen] = useState(false);
=======
  const [session, setSession] = useState("Normale");
>>>>>>> dashboard/rahim

  const user = {
    avatar: "https://via.placeholder.com/100", // Remplace par l'URL de l'image de profil
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    status: "Administrateur",
  };
  
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
<<<<<<< HEAD
      <div className="flex items-center space-x-2 text-white cursor-pointer"
       onClick={() => setIsProfileOpen(true)}>
        <span className="text-xl">👤</span>
        <span>Compte</span>
=======
      <div className="flex items-center flex-col space-x-2 text-white gap-y-1 cursor-pointer">
        <span className="text-xl">
          <FaUser />
        </span>
        <span className="text-sm font-bold">Compte</span>
>>>>>>> dashboard/rahim
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
