import { useEffect, useState } from "react";
import EtudiantService from "@/services/EtudiantService";
import MatiereService from "@/services/MatiereService";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

const MajNotes = () => {
  const [matieres, setMatieres] = useState([]);
  const [codeSelected, setCodeSelected] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [etudiants, setEtudiants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showEtudiants, setShowEtudiants] = useState(false);

  useEffect(() => {
    MatiereService.getAllMatiere()
      .then((response) => {
        setMatieres(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  useEffect(() => {
    EtudiantService.getAllEtudiant()
      .then((response) => {
        setEtudiants(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  const handleRowClick = (index, codeMat) => {
    setSelectedIndex(index);
    setCodeSelected(codeMat);
  };

  const handleValidation = () => {
    const selectedMatiere = matieres[selectedIndex];
    const id = selectedMatiere ? selectedMatiere.id : null;
    if (id) {
      setShowEtudiants(true);
      fetchEtudiantsForMatiere(id);
    }
  };

  const fetchEtudiantsForMatiere = (idMatiere) => {
    setIsLoading(true);
    EtudiantService.getAllEtudiant()
      .then((response) => {
        setEtudiants(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  };

  const handleEdit = (index, etudiant) => {
    setEditIndex(index);
    setEditedData({
      devoir: etudiant.devoir,
      examen: etudiant.examen,
      moyenne: etudiant.moyenne,
    });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedData({});
  };

  const handleSave = (index) => {
    const updatedEtudiants = [...etudiants];
    updatedEtudiants[index] = {
      ...updatedEtudiants[index],
      ...editedData,
    };
    setEtudiants(updatedEtudiants);
    setEditIndex(null);
    setEditedData({});
  };

  const afficheEtudiants = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
        </div>
      );
    } else if (!isLoading && error) {
      return (
        <div className="ml-64 mt-20 w-2/3">
          <div className="bg-red-100 text-red-700 h-50 rounded shadow-md text-center text-3xl">
            ⚠️ Impossible de récupérer la liste. Erreur serveur
          </div>
        </div>
      );
    } else if (etudiants.length === 0) {
      return (
        <div className="ml-60 mt-20 w-2/3 h-2/3">
          <div className="bg-yellow-100 text-yellow-700 h-50 rounded shadow-md text-center text-3xl">
            Aucune donnée disponible pour cette matière.
          </div>
        </div>
      );
    } else {
      return (
        <div className="ml-20 mt-0  w-full ">
          <h1 className="text-2xl font-bold text-center">
            Liste des Étudiants
          </h1>
          <div className="border p-4 ">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-sm text-center">N° CARTE</th>
                  <th className="px-4 py-2 text-sm text-center">NOM</th>
                  <th className="px-4 py-2 text-sm text-center">PRÉNOMS</th>
                  <th className="px-4 py-2 text-sm text-center">SEXE</th>
                  <th className="px-4 py-2 text-sm text-center">Devoir</th>
                  <th className="px-4 py-2 text-sm text-center">Examen</th>
                  <th className="px-4 py-2 text-sm text-center">Moyenne</th>
                  <th className="px-4 py-2 text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {etudiants.map((etudiant, index) => (
                  <tr
                    key={etudiant.numero_carte}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="px-4 py-2 text-center">
                      {etudiant.numero_carte}
                    </td>
                    <td className="px-4 py-2 text-center">{etudiant.nom}</td>
                    <td className="px-4 py-2 text-center">{etudiant.prenom}</td>
                    <td className="px-4 py-2 text-center">{etudiant.sexe}</td>

                    <td className="px-4 py-2 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editedData.devoir || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              devoir: e.target.value,
                            })
                          }
                          className="w-16 text-center border rounded"
                        />
                      ) : (
                        etudiant.devoir
                      )}
                    </td>

                    <td className="px-4 py-2 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editedData.examen || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              examen: e.target.value,
                            })
                          }
                          className="w-16 text-center border rounded"
                        />
                      ) : (
                        etudiant.examen
                      )}
                    </td>

                    <td className="px-4 py-2 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editedData.moyenne || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              moyenne: e.target.value,
                            })
                          }
                          className="w-16 text-center border rounded"
                        />
                      ) : (
                        etudiant.moyenne
                      )}
                    </td>

                    <td className="px-4 py-2 text-center">
                      {editIndex === index ? (
                        <div className="flex justify-center gap-2">
                          <MdCheck
                            className="text-green-600 cursor-pointer"
                            onClick={() => handleSave(index)}
                          />
                          <MdClose
                            className="text-red-600 cursor-pointer"
                            onClick={handleCancel}
                          />
                        </div>
                      ) : (
                        <MdEdit
                          className="text-blue-500 cursor-pointer mx-auto"
                          onClick={() => handleEdit(index, etudiant)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="ml-65 mt-15 p-6 bg-transparent flex flex-col gap-6 w-2/3 h-2/3">
      {!showEtudiants && (
        <>
          <div className="w-full">
            <h2 className="text-lg font-bold text-center m-2">
              Liste des matières
            </h2>
            <div className="overflow-auto rounded-lg shadow-md mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-sm text-center">NUMERO</th>
                    <th className="px-4 py-2 text-sm text-center">LIBELLE</th>
                    <th className="px-4 py-2 text-sm text-center">
                      ABRÉVIATION
                    </th>
                    <th className="px-4 py-2 text-sm text-center">
                      OPTIONNELLE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {matieres.map((matiere, index) => (
                    <tr
                      key={matiere.id}
                      className={`cursor-pointer ${
                        selectedIndex === index
                          ? "bg-blue-300"
                          : index % 2 === 0
                          ? "bg-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => handleRowClick(index, matiere.id)}
                    >
                      <td className="px-4 py-2 text-center">{`MAT${matiere.id}`}</td>
                      <td className="px-4 py-2 text-center">
                        {matiere.libelle}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {matiere.abreviation}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {matiere.optionnelle === 1 ? "Oui" : "Non"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            className={`px-4 py-2 w-70 h-15 text-white font-bold rounded self-center ${
              selectedIndex === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700"
            }`}
            onClick={handleValidation}
            disabled={selectedIndex === null}
          >
            Valider
          </button>
        </>
      )}

      {showEtudiants && afficheEtudiants()}
    </div>
  );
};

export default MajNotes;
