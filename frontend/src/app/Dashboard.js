"use client";
import Matieres from "./components/Matieres";
import Etudiants from "./components/Etudiants"
import Accueil from "./components/Accueil"

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
