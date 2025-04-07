import { useState } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
/**
 * Return the page which contains the table of students
 */
const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([
    {
      carte: "123456",
      nom: "Koffi",
      prenoms: "Jean",
      sexe: "M",
      moyenne: 12.5,
    },
    { carte: "654321", nom: "Doe", prenoms: "Alice", sexe: "F", moyenne: 14.0 },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleDeleteEtudiant = (index) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      setEtudiants(etudiants.filter((_, i) => i !== index));
    }
  };

  const handleEditEtudiant = (index) => {
    setEditIndex(index);
    setEditedData(etudiants[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedEtudiants = [...etudiants];
    updatedEtudiants[index] = editedData;
    setEtudiants(updatedEtudiants);
    setEditIndex(null);
  };

  return (
    <div className="ml-64 mt-20">
      <h1 className="text-2xl font-bold text-center">Liste des Étudiants</h1>
      <div className="border p-4 mt-4">
      <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  N° CARTE
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  NOM
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  PRÉNOMS
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  SEXE
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  MOYENNE
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {etudiants.map((etudiant, index) => (
                <tr
                  key={etudiant.carte}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  {editIndex === index ? (
                    <>
                      <td className=" px-0 py-2 ">{etudiant.carte}</td>
                      <td className="px-4 py-2 text-center">
                        <input
                          value={editedData.nom}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              nom: e.target.value,
                            })
                          }
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          value={editedData.prenoms}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              prenoms: e.target.value,
                            })
                          }
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          value={editedData.sexe}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              sexe: e.target.value,
                            })
                          }
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          value={editedData.moyenne}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              moyenne: e.target.value,
                            })
                          }
                          className="border p-1 w-full"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-green-500 hover:text-green-700"
                          onClick={() => handleSaveEdit(index)}
                        >
                          <MdCheck size={18} />
                        </button>
                        <button
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => setEditIndex(null)}
                        >
                          <MdClose size={18} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 text-center">
                        {etudiant.carte}
                      </td>
                      <td className="px-4 py-2 text-center">{etudiant.nom}</td>
                      <td className="px-4 py-2 text-center">
                        {etudiant.prenoms}
                      </td>
                      <td className="px-4 py-2 text-center">{etudiant.sexe}</td>
                      <td className="px-4 py-2 text-center">
                        {etudiant.moyenne}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditEtudiant(index)}
                          >
                            <MdEdit size={18} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteEtudiant(index)}
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

export default Etudiants;
