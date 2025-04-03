import { useState } from "react";
/**
 * Return a table of lessons on the dashboard
 * 
 */
const MajNotes = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [codeSelected, setCodeSelected] = useState("")
  const matieres = [
    {
      numero: "MAT101",
      libelle: "Mathématiques",
      abbreviation: "MATH",
      optionnelle: "Non",
    },
    {
      numero: "PHY201",
      libelle: "Physique",
      abbreviation: "PHYS",
      optionnelle: "Oui",
    },
    {
      numero: "SVT201",
      libelle: "Science de la vie et de la terre ",
      abbreviation: "SVT",
      optionnelle: "Oui",
    },
    {
      numero: "DESS101",
      libelle: "DESSIN",
      abbreviation: "DES",
      optionnelle: "Oui",
    },
    {
      numero: "HIST201",
      libelle: "Histoire",
      abbreviation: "HG",
      optionnelle: "Oui",
    },
    {
      numero: "EWE201",
      libelle: "Ewe",
      abbreviation: "EWE",
      optionnelle: "Oui",
    },
    {
      numero: "DR201",
      libelle: "Droit penal",
      abbreviation: "DP",
      optionnelle: "Non",
    }
  ];
  const handleRowClick = (index, codeMat) => {
    setSelectedIndex(index);
    setCodeSelected(codeMat)
  };

  const handleValidation = () => {
    console.log("codeSelected " + codeSelected)
    alert("Vous avez cliqué : " + codeSelected);
  };

  return (
    <div className="p-6 bg-transparent w-full flex flex-col gap-6">
      {/* TABLEAU DES MATIÈRES */}
      <div className="w-full">
        <h2 className="text-lg font-bold text-center">Liste des matières</h2>
        <div className="overflow-auto rounded-lg shadow-md mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-700 text-sm text-center">NUMERO</th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">LIBELLE</th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">ABRÉVIATION</th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center"> OPTIONNELLE </th>
              </tr>
            </thead>
            <tbody>
              {matieres.map((matiere, index) => (
                <tr
                  key={matiere.numero}
                  className={`cursor-pointer ${
                    selectedIndex === index
                      ? "bg-blue-300"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleRowClick(index, matiere.numero)}
                >
                  <td className="px-4 py-2 text-center">{matiere.numero}</td>
                  <td className="px-4 py-2 text-center">{matiere.libelle}</td>
                  <td className="px-4 py-2 text-center">
                    {matiere.abbreviation}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {matiere.optionnelle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* BOUTON VALIDER */}
      <button
        className="px-4 py-2 bg-green-500 w-100 h-15 text-white font-bold rounded hover:bg-green-700 self-center"
        onClick={handleValidation}>
        Valider
      </button>
    </div>
  );
};

export default MajNotes;
