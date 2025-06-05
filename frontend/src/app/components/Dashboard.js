"use client";
import Matieres from "../screens/Matieres";
import Etudiants from "../screens/Etudiants";
import Accueil from "../screens/Accueil";
import MajNotes from "../screens/MajNotes";
import Statistique from "../screens/Statistique";
import ListeInscrits from "../screens/edition/ListeInscrits";
import NotesMatieres from "../screens/edition/NotesMatieres";
import PVIndividuels from "../screens/edition/PVIndividuels";
import Releves from "../screens/edition/Releves";
import Admis from "../screens/Admis";
import Echoues from "../screens/Echoues";

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
        return <Statistique />;
      case "Liste des inscrits":
        return <ListeInscrits />;
      case "Admis":
        return <Admis />;
      case "Echoues":
        return <Echoues />;
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
