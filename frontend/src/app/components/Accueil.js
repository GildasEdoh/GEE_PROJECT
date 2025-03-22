"use client";

import InfoCard from "./InfoCard"
import ActionButton from "./ActionButton"

const Accueil = () => {
  return (
    <main className="p-4">
      <div className="grid grid-cols-4 gap-4">
        <InfoCard title="Nombre Total d’étudiants inscrits" value="-----" />
        <InfoCard title="Nombre d’examens programmés" value="-----" />
        <InfoCard title="Status des activités" value="-----" />
        <InfoCard title="Nombre de sessions archivées" value="-----" />
      </div>

      <div className="mt-6 flex space-x-4">
        <ActionButton label="Consulter les archives" onClick={() => alert("Archives ouvertes")} />
        <ActionButton label="Saisir une note" onClick={() => alert("Saisie de note")} />
        <ActionButton label="Nouvelle inscription" onClick={() => alert("Nouvelle inscription")} />
      </div>
    </main>
  );
};

export default Accueil;
