

"use client";

import Navbar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Dashboard from "../components/Dashboard";
import { useState } from "react";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("accueil");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <div className="flex">
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"}`}>
        <SideBar isSidebarOpen={isSidebarOpen} setSelectedMenu={setSelectedMenu} />
      </div>
      <div className="flex-1 flex flex-col mt-16 ml-4">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Dashboard selectedMenu={selectedMenu} />
      </div>
    </div>
  );

}