import { MdEdit, MdDelete } from "react-icons/md";

export default function Etudiants() {
  // Fonction de gestion des clics
  const handleClick = (action, carte) => {
    alert(`Vous avez cliqué sur : ${action} pour la carte ${carte}`);
  };

  const etudiants = [
    {
      carte: "123456",
      nom: "Koffi",
      prenoms: "Jean",
      sexe: "M",
      moyenne: 12.5,
    },
    { carte: "654321", nom: "Doe", prenoms: "Alice", sexe: "F", moyenne: 14.0 },
    {
      carte: "789123",
      nom: "Smith",
      prenoms: "John",
      sexe: "M",
      moyenne: 11.8,
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      <h1 className="text-2xl font-bold text-center mb-4">
        Liste des Étudiants
      </h1>
      <div className="overflow-auto rounded-lg border border-gray-200 shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-gray-700">N° CARTE</th>
              <th className="p-3 border text-gray-700">NOM</th>
              <th className="p-3 border text-gray-700">PRÉNOMS</th>
              <th className="p-3 border text-gray-700">SEXE</th>
              <th className="p-3 border text-gray-700">MOYENNE</th>
              <th className="p-3 border text-gray-700 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {etudiants.length > 0 ? (
              etudiants.map((etudiant, index) => (
                <tr
                  key={etudiant.carte}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 border">{etudiant.carte}</td>
                  <td className="p-3 border">{etudiant.nom}</td>
                  <td className="p-3 border">{etudiant.prenoms}</td>
                  <td className="p-3 border">{etudiant.sexe}</td>
                  <td className="p-3 border">{etudiant.moyenne}</td>
                  <td className="p-3 border flex gap-2 justify-center">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition duration-200"
                      onClick={() => handleClick("Modifier", etudiant.carte)}
                    >
                      <MdEdit size={22} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition duration-200"
                      onClick={() => handleClick("Supprimer", etudiant.carte)}
                    >
                      <MdDelete size={22} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-3 border text-center text-gray-500"
                >
                  Aucun étudiant trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
