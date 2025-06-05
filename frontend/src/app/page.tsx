// "use client";
// import Login from "./SignIn/page";

// export default function Home() {
//   return (
//     <div style={{ backgroundColor: "#6988ED", minHeight: "100vh" }}>
//       <Login />
//     </div>
//   );
// }

// "use client";

// import Navbar from "./components/NavBar";
// import SideBar from "./components/SideBar";
// import Dashboard from "./components/Dashboard"
// import InfoCard from "./components/InfoCard"
// import ActionButton from "./components/ActionButton"
// import { useState } from "react";

// export default function Home() {
//   const [selectedMenu, setSelectedMenu] = useState("accueil");

//   return (
//     <div className="flex h-screen">
//       <SideBar setSelectedMenu={setSelectedMenu} />
//       <div className="flex-1">
//         <Navbar />
//         <Dashboard selectedMenu={selectedMenu} />
//         <main className="p-4">

//           <div className="grid grid-cols-4 gap-4">
//             <InfoCard title="Nombre Total d’étudiants inscrits" value="-----" />
//             <InfoCard title="Nombre d’examens programmés" value="-----" />
//             <InfoCard title="Status des activités" value="-----" />
//             <InfoCard title="Nombre de sessions archivées" value="-----" />
//           </div>

//           <div className="mt-6 flex space-x-4">
//             <ActionButton label="Consulter les archives" onClick={() => alert("Archives ouvertes")} />
//             <ActionButton label="Saisir une note" onClick={() => alert("Saisie de note")} />
//             <ActionButton label="Nouvelle inscription" onClick={() => alert("Nouvelle inscription")} />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";
import Navbar from "./components/NavBar";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import InscriptionService from "@/services/InscriptionService";
import EtudiantService from "@/services/EtudiantService";

export default function Home() {
  const [selectedMenu, setSelectedMenu] = useState("accueil");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const etudiants = [
    {numero_carte: 10, nom: "String", prenom: "String", date_naissance: "01-05-2003",   lieu_naissance: "String",   sexe: "M", Tel_1: "String", id_etablissement: 1, Nationalite: "String", Tel_2: "String", ville: "String", quartier: "String", rue: "String", },
    {numero_carte: 10, nom: "String", prenom: "String", date_naissance: "01-05-2003",   lieu_naissance: "String",   sexe: "M", Tel_1: "String", id_etablissement: 1, Nationalite: "String", Tel_2: "String", ville: "String", quartier: "String", rue: "String", },
    {numero_carte: 10, nom: "String", prenom: "String", date_naissance: "01-05-2003",   lieu_naissance: "String",   sexe: "M", Tel_1: "String", id_etablissement: 1, Nationalite: "String", Tel_2: "String", ville: "String", quartier: "String", rue: "String", },
  ]
  EtudiantService.addAllEtudiant(etudiants).then((res) => {
        console.log("insertion réussie !");
        })
        .catch((err) => {
          console.log("echec !");
        });

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

// import StatistiqueComponent from './components/Statistique';

// export default function StatistiquePage() {
//   return (
//     <div className="p-4">
//       <StatistiqueComponent />
//     </div>
//   );
// }
