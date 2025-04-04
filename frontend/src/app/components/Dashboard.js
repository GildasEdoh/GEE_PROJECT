"use client";
import Matieres from "./Matieres";
import Etudiants from "./Etudiants"
import Accueil from "./Accueil"

export default function Dashboard({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case "Matières":
        return <Matieres />;
      case "Étudiants":
        return <Etudiants/>
      default:
        return <Accueil/>
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}
