import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const Matieres = () => {
  const [libelle, setLibelle] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [optionnelle, setOptionnelle] = useState("Non");

  const handleClick = (action) => {
    alert(`Vous avez cliqué sur : ${action}`);
  };

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

  return (
    <div className="p-6 bg-transparent w-full flex gap-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-1/3">
        <h2 className="text-lg font-bold mb-4">Créer une matière</h2>
        <label className="block mb-2 text-sm font-semibold">Libellé</label>
        <input
          type="text"
          className="w-full p-1 border rounded mb-3"
          placeholder="Ex: Mathématiques"
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
        />

        <label className="block mb-2 text-sm font-semibold">Abréviation</label>
        <input
          type="text"
          className="w-full p-1 border rounded mb-3"
          placeholder="Ex: MATH"
          value={abbreviation}
          onChange={(e) => setAbbreviation(e.target.value)}
        />

        <label className="block mb-2 text-sm font-semibold">Optionnelle</label>
        <select
          className="w-full p-1 border rounded mb-3"
          value={optionnelle}
          onChange={(e) => setOptionnelle(e.target.value)}
        >
          <option value="Oui">Oui</option>
          <option value="Non">Non</option>
        </select>

        <button
          className="w-full bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600"
          onClick={() => handleClick("Ajouter une matière")}
        >
          Ajouter
        </button>
      </div>
      <div className="w-2/3">
        <h2 className="text-lg font-bold text-center">Liste des matières</h2>
        <div className="overflow-auto rounded-lg border border-gray-500 shadow-md mt-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/50">
              <tr>
                <th className="p-2 border text-sm">NUMERO</th>
                <th className="p-2 border text-sm">LIBELLE</th>
                <th className="p-2 border text-sm">ABRÉVIATION</th>
                <th className="p-2 border text-sm">OPTIONNELLE</th>
                <th className="p-2 border text-sm">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {matieres.map((matiere) => (
                <tr key={matiere.numero} className="bg-white">
                  <td className="p-2 border text-sm">{matiere.numero}</td>
                  <td className="p-2 border text-sm">{matiere.libelle}</td>
                  <td className="p-2 border text-sm">{matiere.abbreviation}</td>
                  <td className="p-2 border text-sm text-center">
                    {matiere.optionnelle}
                  </td>
                  <td className="p-2 border text-sm flex gap-2 justify-center">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleClick(`Modifier ${matiere.numero}`)}
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleClick(`Supprimer ${matiere.numero}`)}
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Matieres;
