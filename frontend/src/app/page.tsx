"use client";

import Navbar from "./components/NavBar";
import ActionButton from "./components/ActionButton";
import SideBar from "./components/SideBar"
import InfoCard from "./components/InfoCard"

export default function Home() {
  return (
    <div className="bg-white flex h-screen">
      <SideBar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">
          
          <div className="grid grid-cols-4 gap-4">
            <InfoCard title="Nombre Total d’étudiants inscrits" value="-----" />
            <InfoCard title="Nombre d’examens programmés" value="-----" />
            <InfoCard title="Status des activités" value="-----" />
            <InfoCard title="Nombre de sessions archivées" value="-----" />
          </div>

          <div className="mt-6 flex space-x-4">
            <ActionButton label="Consulter les archives" onClick={() => alert("Archives ouvertes")} />
            <ActionButton label="Saisir une note" onClick={() => alert("Saisie de note")} />
            <ActionButton label="Nouvelle inscription" onClick={() => alert("Nouvelle inscription")} />
          </div>
        </main>
      </div>
    </div>
  );
}
