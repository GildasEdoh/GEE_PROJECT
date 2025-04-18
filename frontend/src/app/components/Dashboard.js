/**
 * Change the dashboard component according to the selection
 */

"use client";
import Matieres from "./Matieres";
import Etudiants from "./Etudiants"
import Accueil from "./Accueil"
import MajNotes from "./MajNotes"
import NotesParMatieres from "./NotesParMatieres"
import RepartitionNoteParMatiere from "./RepartionNoteParMatiere"
import RepartitionEtudiantParMention from "./RepartitionEtudiantParMention"
import FrequenceResultatParMatiere from "./FrequenceResultatParMatiere"
import PVnotes from "./PVnotes"
import ListingNotes from "./ListingNotes"
import SelectionEvaluation from "./SelectionEvaluation"
import ListingMoyennes from './ListingMoyennes';
export default function Dashboard({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case "Matières":
        return <Matieres />;
      case "Étudiants":
        return <Etudiants />
      case "Mise à jour Notes":
        return <MajNotes />
      case "Notes par matieres":
        return <NotesParMatieres />
      case "Repartition notes par matiere":
        return <RepartitionNoteParMatiere />
      case "Repartition etudiants par mentions":
        return <RepartitionEtudiantParMention />
      case "Frequence resultats par matiere":
        return <FrequenceResultatParMatiere />
      case "Listing des notes":
        return <SelectionEvaluation />
      case "PV individuel des notes":
        return <PVnotes />
      case "Frequence resultats par matiere":
        return <FrequenceResultatParMatiere />
      case "Résultats":
        return <ListingMoyennes />

      default:
        return <Accueil />
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}