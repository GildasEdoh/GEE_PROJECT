"use client";

import { FaUser, FaSearch, FaBell, FaSms, FaBars, FaMoon, FaSun  } from "react-icons/fa";
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
    <nav className="w-full bg-blue-400 p-3 flex items-center justify-between fixed top-0 right-0 left-0 z-50">
      <div className="flex justify-between items-center gap-38">
        <button
          className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      <div className="flex items-center justify-between gap-8">
        {/* Barre de recherche */}
        {showSearch && (
          <div className="hidden lg:block relative flex-grow w-full">
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
        <div className="flex items-center justify-evenly gap-4">
          {/* Icone de messagerie */}
          <div>
            <button
              className="w-full hidden md:block  flex items-center space-x-3 p-2 rounded-lg cursor-pointer"
              onClick={() => setSelectedMenu("acceuil")}
            >
              <FaSms />
            </button>
          </div>

          {/* Sélecteur de session */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">Session</span>
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
            <span className="text-white text-sm">Année</span>
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
          {/* Icone de theme */}
          <div>
            <button
              className="w-full flex items-center space-x-3 p-2 rounded-lg cursor-pointer"
            >
              <FaSun  className="text-yellow-400 text-2xl"/>
            </button>
          </div>
          {/* Icône Profil */}
          <div
            className="text-white cursor-pointer hover:text-blue-200 bg-blue-600 p-3 rounded-full"
            onClick={() => setIsProfileOpen(true)}
          >
            <span className="text-md">
              <FaUser />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
