"use client";

import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard"
import { useState } from "react";
import React from "react";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("accueil");

  return (
    <div className="flex h-screen">
      <SideBar setSelectedMenu={setSelectedMenu} />
      <div className="flex-1">
        <Navbar />
        <Dashboard selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};