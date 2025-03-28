// "use client";

// import InfoCard from "../components/InfoCard"
// import ActionButton from "../components/ActionButton"

// const Accueil = () => {
//   return (
//     <main className="p-4">
//       <div className="flex justify-center gap-8">
//         <InfoCard title="Nombre Total d’étudiants inscrits" value="300" />
//         <InfoCard title="Nombre d’examens programmés" value="3" />
//         <InfoCard title="Status des activités" value="-----" />
//         <InfoCard title="Nombre de sessions archivées" value="5" />
//       </div>

//       <div className="flex justify-center mt-8 space-x-8">
//         <ActionButton label="Consulter les archives" onClick={() => alert("Archives ouvertes")} />
//         <ActionButton label="Saisir une note" onClick={() => alert("Saisie de note")} />
//         <ActionButton label="Nouvelle inscription" onClick={() => alert("Nouvelle inscription")} />
//       </div>
//     </main>
//   );
// };

// export default Accueil;

// "use client";

// import Navbar from "../components/Dashboard";
// import SideBar from "../components/Dashboard";
// import { useState } from "react";
// import InfoCard from "../components/InfoCard"
// import ActionButton from "../components/ActionButton"
// export default function Accueil() {
//   const [selectedMenu, setSelectedMenu] = useState("accueil");

//   return (
//     <div className="flex h-screen">
//       <SideBar />
//       <div className="flex-1">
//         <Navbar />
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

import Navbar from "../components/Dashboard";
import SideBar from "../components/Dashboard";
import Dashboard from "../components/Dashboard"
import { useState } from "react";

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
}