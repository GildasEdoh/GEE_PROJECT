"use client";

import { FaUser, FaSearch, FaBell, FaSms } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import du composant Avatar

const Navbar = () => {
  const [year, setYear] = useState("2024-2025");
  const [session, setSession] = useState("Normale");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [setSelectedMenu] = useState("acceuil");
  const router = useRouter(); // pour rediriger

  const user = {
    avatar: "https://via.placeholder.com/100", // Remplace par l'URL de l'image de profil
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    status: "Administrateur",
  };
  const handleRedirect = () => {
    setIsProfileOpen(false); // on ferme la fenêtre
    router.push("/compte"); // redirection
  };

  return (
    <nav className="bg-blue-400 p-2 flex items-center justify-end gap-x-6 fixed top-0 right-0 left-0">
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
          onClick={() => setSelectedMenu("acceuil")}
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
          onClick={() => setSelectedMenu("acceuil")}
        >
          <FaBell />
        </button>
      </div>
      {/* Icône Profil */}
      <div
        className="flex items-center flex-col space-x-2 text-white gap-y-1 cursor-pointer hover:text-blue-200"
        onClick={() => setIsProfileOpen(true)}
      >
        <span className="text-xl">
          <FaUser />
        </span>
        <span className="text-sm font-bold">Compte</span>
      </div>

      {/* Fenêtre latérale */}
      {isProfileOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 w-[400px] bg-white shadow-lg rounded-xl p-6 z-100"
        >
          <button
            className="text-red-500 font-bold text-lg absolute top-2 right-4"
            onClick={() => setIsProfileOpen(false)}
          >
            ✖
          </button>

          {/* Avatar */}
          <Avatar className="w-24 h-24 border-2 border-gray-300 mx-auto mt-6">
            <AvatarImage src={user.avatar} alt="Profil" />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          {/* Nom complet */}
          <h2 className="text-xl font-semibold mt-4 text-center">
            {user.firstName} {user.lastName}
          </h2>

          {/* Statut */}
          <span className="bg-blue-200 text-blue-800 px-3 py-1 mt-2 rounded-lg text-sm block text-center">
            {user.status}
          </span>

          {/* Bouton Gérer le compte */}
          <button
            onClick={handleRedirect}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Gérer mon compte
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
