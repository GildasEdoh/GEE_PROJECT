"use client";

import { FaUser, FaSearch, FaBell, FaSms, FaBars } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = ({ toggleSidebar }) => {
  const [year, setYear] = useState("2024-2025");
  const [session, setSession] = useState("Normale");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [setSelectedMenu] = useState("acceuil");
  const [showSearch, setShowSearch] = useState(true);
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
    <nav className="flex-grow w-full bg-blue-400 p-3 flex items-center justify-end gap-x-6 fixed top-0 right-0 left-0 z-10">
      <button
        className="p-2 mb-4 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Barre de recherche */}
      {showSearch && (
        <div className="hidden md:block relative lg:w-1/4 md:w-0.5/4">
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full px-3 py-1 md:px-1 md:py-1 rounded-lg border-none bg-white focus:outline-none"
          />
          <span className="absolute right-3 top-2 text-gray-500">
            <FaSearch />
          </span>
        </div>
      )}

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
          className="fixed top-17 right-3 w-[400px] bg-white shadow-md rounded-sm p-6 z-100"
        >
          <button
            className="text-red-500 font-bold text-lg absolute top-2 right-4"
            onClick={() => setIsProfileOpen(false)}
          >
            ✖
          </button>

          {/* Avatar */}
          <Avatar className="w-15 h-15 border-2 border-gray-300 mx-auto">
            <AvatarImage src={user.avatar} alt="Profil" />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          {/* Nom complet */}
          <h2 className="lg:text-lg md:text-md text-sm font-semibold mt-4 text-center">
            {user.firstName} {user.lastName}
          </h2>

          {/* Statut */}
          <span className="bg-blue-200 text-blue-800 px-1 py-2 mt-2 rounded-md text-sm block text-center">
            {user.status}
          </span>

          {/* Bouton Gérer le compte */}
          <button
            onClick={handleRedirect}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Gérer mon compte
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
