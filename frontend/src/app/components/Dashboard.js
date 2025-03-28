"use client";
import Matieres from "../matieres/page";
import Etudiants from "../etudiants/page"
import Accueil from "../home/page"

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
