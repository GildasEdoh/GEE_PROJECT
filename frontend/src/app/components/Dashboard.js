/**
 * Change the dashboard component according to the selection
 */

"use client";
import Matieres from "./Matieres";
import Etudiants from "./Etudiants"
import Accueil from "./Accueil"
import MajNotes from "./MajNotes"
import Statistique from "./Statistique";
import ListeInscrits from "./edition/ListeInscrits";
import NotesMatieres from "./edition/NotesMatieres";
import PVIndividuels from "./edition/PVIndividuels";
import Releves from "./edition/Releves";

export default function Dashboard({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case "Matières":
        return <Matieres />;
      case "Étudiants":
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
      default:
        return <Accueil />;
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}
