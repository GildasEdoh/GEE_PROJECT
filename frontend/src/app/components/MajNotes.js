import { useState } from "react";
/**
 * 
 */
const MajNotes = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

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
  ];

  const handleRowClick = (index) => {
    setSelectedIndex(index);
  };

  const handleValidation = () => {
    alert("Vous avez cliqué");
  };

  return (
    <div className="p-6 bg-transparent w-full flex flex-col gap-6">
      {/* TABLEAU DES MATIÈRES */}
      <div className="w-2/3">
        <h2 className="text-lg font-bold text-center">Liste des matières</h2>
        <div className="overflow-auto rounded-lg shadow-md mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-700 text-sm">NUMERO</th>
                <th className="px-4 py-2 text-gray-700 text-sm">LIBELLE</th>
                <th className="px-4 py-2 text-gray-700 text-sm">ABRÉVIATION</th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  OPTIONNELLE
                </th>
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
                  onClick={() => handleRowClick(index)}
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
        className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 self-center"
        onClick={handleValidation}
      >
        Valider
      </button>
    </div>
  );
};

export default MajNotes;
