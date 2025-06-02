/**
 * Change the dashboard component according to the selection
 */

"use client";
import Matieres from "./Matieres";
import Etudiants from "./Etudiants"
import Accueil from "./Accueil"
import Notes from "./Notes"
export default function Dashboard({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case "Matières":
        return <Matieres />;
      case "Étudiants":
        return <Etudiants/>
      case "Notes":
        return <Notes/>
      default:
        return <Accueil/>
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}