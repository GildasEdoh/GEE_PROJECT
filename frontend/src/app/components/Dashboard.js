"use client";
<<<<<<< HEAD
import Matieres from "../screens/Matieres";
import Etudiants from "../screens/Etudiants"
import Accueil from "../screens/Accueil"
import MajNotes from "../screens/MajNotes"
import Statistique from "../screens/Statistique";
import ListeInscrits from "../screens/edition/ListeInscrits";
import NotesMatieres from "../screens/edition/NotesMatieres";
import PVIndividuels from "../screens/edition/PVIndividuels";
import Releves from "../screens/edition/Releves";

=======
import Matieres from "./Matieres";
import Etudiants from "./Etudiants";
import Accueil from "./Accueil";
import MajNotes from "./MajNotes";
import Statistiques from "./Statistique";
>>>>>>> lena
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
<<<<<<< HEAD
        return <Statistique/>;
      case "Liste des inscrits":
        return <ListeInscrits />;
      case "Notes par Matières":
        return <NotesMatieres />;
      case "PV individuels":
        return <PVIndividuels />;
      case "Releves":
        return <Releves />;
=======
        return <Statistiques />;
      case "Admis":
        return <Etudiants />;
>>>>>>> lena
      default:
        return <Accueil />;
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}
