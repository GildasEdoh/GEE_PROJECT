"use client";

import InfoCard from "./InfoCard"
import ActionButton from "./ActionButton"

const Accueil = () => {
  return (
    <main className="p-4">
      <div className="flex justify-center gap-8">
        <InfoCard title="Nombre Total d’étudiants inscrits" value="300" />
        <InfoCard title="Nombre d’examens programmés" value="3" />
        <InfoCard title="Status des activités" value="-----" />
        <InfoCard title="Nombre de sessions archivées" value="5" />
      </div>

      <div className="flex justify-center mt-8 space-x-8">
        <ActionButton label="Consulter les archives" onClick={() => alert("Archives ouvertes")} />
        <ActionButton label="Saisir une note" onClick={() => alert("Saisie de note")} />
        <ActionButton label="Nouvelle inscription" onClick={() => alert("Nouvelle inscription")} />
      </div>
    </main>
  );
};

export default Accueil;
