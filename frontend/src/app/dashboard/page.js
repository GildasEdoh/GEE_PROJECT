"use client";

import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import { useState } from "react";
import React from "react";
/**
 *
 */
export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("accueil");

  /*  return (
    <div className="flex min-h-screen">
      <SideBar setSelectedMenu={setSelectedMenu} />
      <div className="flex-1 flex flex-col overflow-scroll">
        <Navbar />
        <Dashboard selectedMenu={selectedMenu} />
      </div>
    </div>
  ); */
  return (
    <div className="flex h-screen">
      {/* Sidebar fixe */}
      <SideBar setSelectedMenu={setSelectedMenu} />

      {/* Partie droite : navbar + contenu scrollable */}
      <div className="flex flex-col flex-1 h-screen">
        <Navbar />

        {/* Contenu du tableau de bord, scrollable s'il dépasse */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
          <Dashboard selectedMenu={selectedMenu} />
        </div>
      </div>
    </div>
  );
}
