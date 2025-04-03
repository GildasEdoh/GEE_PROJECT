/**
 * 
 */

"use client";
import Matieres from "./Matieres";
import Etudiants from "./Etudiants"
import Accueil from "./Accueil"
import MajNotes from "./MajNotes"
export default function Dashboard({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case "Matières":
        return <Matieres />;
      case "Étudiants":
        return <Etudiants/>
      case "Mise à jour Notes":
        return <MajNotes/>
      default:
        return <Accueil/>
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}