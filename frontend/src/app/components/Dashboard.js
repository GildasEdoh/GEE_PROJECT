/* "use client";
import Matieres from "./Matieres";
import Etudiants from "./Etudiants";
import Accueil from "./Accueil";
import MatieresNote from "./MatieresNote";

export default function Dashboard({ selectedMenu }) {
  const renderContent = () => {
    switch (selectedMenu) {
      case "Matières":
        return <Matieres />;
      case "Étudiants":
        return <Etudiants />;
      case "Évaluations":
        switch (selectedSubMenu) {
          case "Notes":
            switch (selectedSubMenu) {
              case "Édition":
                return <MatieresNote />;
              case "Relevées":
                return <Etudiants />;
              default:
                return <Accueil />;
            }
          case "Admis":
            return <Etudiants />;
          case "Échoués":
            return <Etudiants />;
          default:
            return <Accueil />;
        }
      default:
        return <Accueil />;
    }
  };

  return <div className="p-4">{renderContent()}</div>;
}
 */
"use client";
import Matieres from "./Matieres";
import Etudiants from "./Etudiants";
import Accueil from "./Accueil";
import MatieresNote from "./MatieresNote"; // Remplace par le bon composant

export default function Dashboard({ selectedMenu, selectedSubMenu }) {
  const components = {
    Matières: Matieres,
    Étudiants: Etudiants,
    Évaluations: {
      Notes: {
        Édition: MatieresNote, // Remplace par le bon composant
        Relevées: Etudiants, // Remplace par le bon composant
      },
      Admis: Etudiants,
      Échoués: Etudiants,
    },
  };

  const SelectedComponent =
    selectedSubMenu && components[selectedMenu]?.[selectedSubMenu]
      ? components[selectedMenu][selectedSubMenu]
      : components[selectedMenu] || Accueil;

  return (
    <div className="p-4">
      <SelectedComponent />
    </div>
  );
}
