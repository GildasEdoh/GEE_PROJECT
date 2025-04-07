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
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-white/50">
              <th className="border p-2">CODE</th>
              <th className="border p-2">NOM</th>
              <th className="border p-2">PRÉNOMS</th>
              <th className="border p-2">SEXE</th>
              <th className="border p-2">N° CARTE</th>
              <th className="border p-2">MOYENNE</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder des étudiants */}
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
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
    </div>
  );
};

export default Etudiants;
