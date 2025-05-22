import { useEffect, useState } from "react";
import EtudiantService from "@/services/EtudiantService";
import MatiereService from "@/services/MatiereService";
import NoteService from "@/services/NoteService";

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
  const [evaluation, setEvaluation] = useState("Devoir");
  const [typeParcours, setTypeParcours] = useState("admis");
  const [typeFiliere, setTypeFiliere] = useState("admis");
  const [typeAnneEtude, setypeAnneEtude] = useState("admis");

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
    EtudiantService.getAllEtudiantsBySubject(idMatiere)
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

  /* const handleEdit = (index, etudiant) => {
    setEditIndex(index);
    setEditedData({
      devoir: etudiant.devoir ?? "",
      examen: etudiant.examen ?? "",
      moyenne: etudiant.moyenne ?? "",
    });
  }; */
  const handleEdit = (index) => {
    const etudiant = etudiants[index];
    const id = etudiant.numero_carte;

    // Tu as maintenant l'ID de l'étudiant !
    console.log("ID de l'étudiant :", id);

    setEditIndex(index);
    setEditedData({
      devoir: etudiant.devoir ?? "",
      examen: etudiant.examen ?? "",
      moyenne: etudiant.moyenne ?? "",
    });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedData({});
  };

  /*  const handleSave = (index) => {
    const updatedEtudiants = [...etudiants];
    updatedEtudiants[index] = {
      ...updatedEtudiants[index],
      ...editedData,
    };
    setEtudiants(updatedEtudiants);
    setEditIndex(null);
    setEditedData({});
  }; */

  const handleSave = async (index) => {
    try {
      const updatedEtudiants = [...etudiants];
      const etudiant = etudiants[index]; // donc ici encore tu as l'ID
      const id = etudiant.numero_carte;

      const devoir = parseFloat(editedData.devoir);
      const examen = parseFloat(editedData.examen);
      const moyenne = parseFloat(editedData.moyenne);

      // Validation des champs requis
      if (evaluation === "Devoir") {
        if (isNaN(devoir) || devoir < 0 || devoir > 20) {
          alert("Veuillez entrer une note de devoir valide entre 0 et 20.");
          setdevoir("");
          return;
        }

        await NoteService.addNote({
          fk_etudiant: id,
          fk_evaluation_matiere_type: 1,
          devoir,
          gele: 0,
        });

        updatedEtudiants[index] = { ...etudiant, devoir };
      } else if (evaluation === "Examen") {
        if (
          isNaN(devoir) ||
          devoir < 0 ||
          devoir > 20 ||
          isNaN(examen) ||
          examen < 0 ||
          examen > 20 ||
          isNaN(moyenne) ||
          moyenne < 0 ||
          moyenne > 20
        ) {
          alert(
            "Toutes les notes doivent être des nombres valides entre 0 et 20."
          );
          return;
        }

        await NoteService.addNote({
          fk_etudiant: id,
          fk_evaluation_matiere_type: 2,
          examen,
          gele: 0,
        });

        updatedEtudiants[index] = {
          ...etudiant,
          devoir,
          examen,
          moyenne,
        };
      }

      setEtudiants(updatedEtudiants);
      setEditIndex(null);
      setEditedData({});
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la note :", error);
      alert("Une erreur s'est produite.");
    }
  };

  const afficheEtudiants = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
        </div>
      );
    } else if (error) {
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
        <div className="ml-20 mt-0 w-full">
          <div className="flex items-center gap-4 ml-50">
            <select
              value={typeParcours}
              onChange={(e) => setTypeParcours(e.target.value)}
              className="p-2 border-none rounded-md shadow-sm text-sm"
            >
              <option value="admis">Licence</option>
              <option value="echoues">Master</option>
            </select>
            <select
              value={typeFiliere}
              onChange={(e) => setTypeFiliere(e.target.value)}
              className="p-2 border-none rounded-md shadow-sm text-sm"
            >
              <option value="admis">Genie Logiciel</option>
              <option value="echoues">Genie Civil</option>
              <option value="admis">Systèmes et Réseaux</option>
              <option value="echoues">Informatique et Systèmes</option>
            </select>
            <select
              value={typeAnneEtude}
              onChange={(e) => setypeAnneEtude(e.target.value)}
              className="p-2 border-none rounded-md shadow-sm text-sm"
            >
              <option value="admis">1ere année</option>
              <option value="echoues">2e année</option>
            </select>
          </div>

          <div className="flex items-center space-x-10 ml-60 mt-7">
            <span className="text-black font-bold text-sm">Evaluation</span>
            <select
              value={evaluation}
              onChange={(e) => setEvaluation(e.target.value)}
              className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white"
            >
              <option>Devoir</option>
              <option>Examen</option>
            </select>
          </div>

          <div className="border p-4 mt-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-sm text-center">N° CARTE</th>
                  <th className="px-4 py-2 text-sm text-center">NOM</th>
                  <th className="px-4 py-2 text-sm text-center">PRÉNOMS</th>
                  <th className="px-4 py-2 text-sm text-center">SEXE</th>
                  {evaluation === "Devoir" && (
                    <th className="px-4 py-2 text-sm text-center">Devoir</th>
                  )}
                  {evaluation === "Examen" && (
                    <>
                      <th className="px-4 py-2 text-sm text-center">Devoir</th>
                      <th className="px-4 py-2 text-sm text-center">Examen</th>
                      <th className="px-4 py-2 text-sm text-center">Moyenne</th>
                    </>
                  )}
                  <th className="px-4 py-2 text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {etudiants.map((etudiant, index) => (
                  <tr
                    key={`${etudiant.numero_carte}-${index}`}
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
                          id="devoir-input"
                          type="number"
                          value={editedData.devoir || ""}
                          onChange={(e) => {
                            console.log("Valeur saisie :", e.target.value);
                            setEditedData({
                              ...editedData,

                              devoir: e.target.value,
                            });
                          }}
                          disabled={evaluation !== "Devoir"}
                          className="w-16 text-center border rounded bg-gray-100 disabled:opacity-50"
                        />
                      ) : (
                        etudiant.devoir
                      )}
                    </td>
                    {evaluation === "Examen" && (
                      <>
                        <td className="px-4 py-2 text-center">
                          {editIndex === index ? (
                            <input
                              id="examen-input"
                              type="number"
                              value={editedData.examen || ""}
                              onChange={(e) =>
                                setEditedData({
                                  ...editedData,
                                  examen: e.target.value,
                                })
                              }
                              className="w-16 text-center border rounded bg-gray-100"
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
                              className="w-16 text-center border rounded bg-gray-100"
                            />
                          ) : (
                            etudiant.moyenne
                          )}
                        </td>
                      </>
                    )}
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
    <div className="p-6 bg-transparent">
      <div className="flex flex-col gap-6">
        {!showEtudiants && (
          <>
            <div className="w-full">
              <h2 className="text-lg xl:text-xl font-bold text-center m-2">
                Liste des matières
              </h2>
              <div className="h-[400px] overflow-y-auto pl-4 pr-4 pb-3 flex flex-col w-full">
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
              className={`px-2 py-2 w-full cursor-pointer text-white font-bold rounded self-center ${
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
    </div>
  );
};

export default MajNotes;
