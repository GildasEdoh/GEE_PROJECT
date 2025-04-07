import { useState } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
/**
 * 
 */

const Matieres = () => {
<<<<<<< HEAD
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

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [libelle, setLibelle] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [optionnelle, setOptionnelle] = useState("Non");

  const handleEditClick = (index, matiere) => {
    setEditIndex(index);
    setEditData({ ...matiere });
  };

  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const handleSave = (index) => {
    const updatedMatieres = [...matieres];
    updatedMatieres[index] = editData;
    setMatieres(updatedMatieres);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette matière ?")) {
      setMatieres(matieres.filter((_, i) => i !== index));
    }
  };

  const handleAdd = () => {
    const newMatiere = {
      numero: `MAT${matieres.length + 1}01`,
      libelle,
      abbreviation,
      optionnelle,
    };
    setMatieres([...matieres, newMatiere]);
    setLibelle("");
    setAbbreviation("");
    setOptionnelle("Non");
  };

  return (
    <div className="p-6 bg-transparent w-full flex gap-6">
      {/* FORMULAIRE D'AJOUT */}
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
          onClick={handleAdd}
        >
          Ajouter
        </button>
      </div>
      {/* TABLEAU DES MATIÈRES */}
      <div className="w-2/3">
        <h2 className="text-lg font-bold text-center">Liste des matières</h2>
        <div className="overflow-auto rounded-lg shadow-md mt-4">
=======
  return (
    <div className=" ml-64 mt-15">
      <div className="p-6 bg-transparent shadow-md rounded-lg w-full">
        <h2 className="text-2xl font-bold text-center">Liste des matières</h2>

        {/* Tableau des matières */}
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-md mt-4">
>>>>>>> dashboard/rahim
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-700 text-sm">NUMERO</th>
                <th className="px-4 py-2 text-gray-700 text-sm">LIBELLE</th>
                <th className="px-4 py-2 text-gray-700 text-sm">ABRÉVIATION</th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  OPTIONNELLE
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {matieres.map((matiere, index) => (
                <tr
                  key={matiere.numero}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  {editIndex === index ? (
                    <>
                      <td className="px-4 py-2 text-center">
                        {matiere.numero}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="text"
                          className="w-full p-1 border rounded"
                          value={editData.libelle}
                          onChange={(e) => handleInputChange(e, "libelle")}
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="text"
                          className="w-full p-1 border rounded"
                          value={editData.abbreviation}
                          onChange={(e) => handleInputChange(e, "abbreviation")}
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <select
                          className="w-full p-1 border rounded"
                          value={editData.optionnelle}
                          onChange={(e) => handleInputChange(e, "optionnelle")}
                        >
                          <option value="Oui">Oui</option>
                          <option value="Non">Non</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="text-green-500 hover:text-green-700"
                            onClick={() => handleSave(index)}
                          >
                            <MdCheck size={18} />
                          </button>
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={handleCancel}
                          >
                            <MdClose size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
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
                      <td className="px-4 py-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditClick(index, matiere)}
                          >
                            <MdEdit size={18} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(index)}
                          >
                            <MdDelete size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
=======
              {/* Exemple de données */}
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>

              {/* Exemple de données */}
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>

              {/* Exemple de données */}
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>

              {/* Exemple de données */}
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Ajouter une matière
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Modifier une matière
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Supprimer une matière
          </button>
        </div>
>>>>>>> dashboard/rahim
      </div>
    </div>
  );
};

export default Matieres;
