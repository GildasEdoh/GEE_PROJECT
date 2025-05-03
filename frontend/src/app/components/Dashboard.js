/**
 * Change the dashboard component according to the selection
 */

"use client";
import Matieres from "./Matieres";
<<<<<<< HEAD
import Etudiants from "./Etudiants";
import Accueil from "./Accueil";
import MajNotes from "./MajNotes";
=======
import Etudiants from "./Etudiants"
import Accueil from "./Accueil"
import MajNotes from "./MajNotes"
import Statistique from "./Statistique";
>>>>>>> 81c7cf033318ddf75373da768563169d82d20e84
export default function Dashboard({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case "Matières":
        return <Matieres />;
      case "Étudiants":
<<<<<<< HEAD
        return <Etudiants />;
      case "Notes":
        return <MajNotes />;
=======
        return <Etudiants/>
      case "Mise à jour Notes":
        return <MajNotes/>
      case "Statistiques":
        return <Statistique/>
>>>>>>> 81c7cf033318ddf75373da768563169d82d20e84
      default:
        return <Accueil />;
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}
