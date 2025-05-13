/**
 * Change the dashboard component according to the selection
 */

"use client";
import Matieres from "./Matieres";
<<<<<<< HEAD
import Etudiants from "./Etudiants";
import Accueil from "./Accueil";
import MajNotes from "./MajNotes";
import Statistiques from "./Statistique"
=======
import Etudiants from "./Etudiants"
import Accueil from "./Accueil"
import MajNotes from "./MajNotes"
import Statistique from "./Statistique";
import ListeInscrits from "./edition/ListeInscrits";
import NotesMatieres from "./edition/NotesMatieres";
import PVIndividuels from "./edition/PVIndividuels";
import Releves from "./edition/Releves";

>>>>>>> ab77f68300db8becb4244c98ce8322fab5a4d765
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
      case "Statistiques":
        return <Statistiques />;
=======
        return <Etudiants/>;
      case "Mise à jour Notes":
        return <MajNotes/>;
      case "Statistiques":
        return <Statistique/>;
      case "Liste des inscrits":
        return <ListeInscrits />;
      case "Notes par Matières":
        return <NotesMatieres />;
      case "PV individuels":
        return <PVIndividuels />;
      case "Releves":
        return <Releves />;
>>>>>>> ab77f68300db8becb4244c98ce8322fab5a4d765
      default:
        return <Accueil />;
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}
