import { useState } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

/**
 * Return a table sudents notes 
 * 
 */

const Notes = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [codeSelected, setCodeSelected] = useState("")
  
  const handleRowClick = (index, codeMat) => {
    setCodeSelected("")
    setSelectedIndex(index);
    setCodeSelected(codeMat)
    handleValidation()
  };

  const handleValidation = () => {
    console.log("codeSelected " + codeSelected)
    alert("Vous avez cliqué : " + codeSelected);
  };

  const [matieres, setMatieres] = useState([
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
  ]);
  //"ml-64 mt-20 h-[calc(100vh-5rem)] overflow-y-auto p-6 space-y-6 bg-gray-100"
  return (
    <div className="ml-64 mt-20 h-[calc(100vh-5rem)] overflow-y-auto p-6 space-y-6 bg-blue-100">
      <h2 className="bg-white text-lg font-bold text-center mb-6 mt-6">Choisissez la matiere</h2>
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-md w-full">
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
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}  
                   ${selectedIndex === index ? "bg-black" : ""}
                  cursor-pointer`}
                  onClick={() => handleRowClick(index, matiere.numero)}>
                  <td className="px-4 py-2 text-center">
                    {matiere.numero}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {matiere.libelle}
                  </td>
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
        <div className="flex justify-center mt-4 space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Importer un fichier excel
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Imprimer la liste des matieres 
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Exporter la liste au format excel
          </button>
        </div>
    </div>
  );
};

export default Notes;
