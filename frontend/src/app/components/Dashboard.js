"use client";
import Matieres from "./Matieres";
import Etudiants from "./Etudiants";
import Accueil from "./Accueil";
import MajNotes from "./MajNotes";
import Statistiques from "./Statistique"
export default function Dashboard({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case "Matières":
        return <Matieres />;
      case "Étudiants":
        return <Etudiants />;
      case "Notes":
        return <MajNotes />;
      case "Statistiques":
        return <Statistiques />;
      default:
        return <Accueil />;
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}
