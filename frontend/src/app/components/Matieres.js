import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import MatiereService from "@/services/MatiereService";
import EtudiantService from "@/services/EtudiantService";
import * as XLSX from "xlsx";

/**
 * This page provides the list of matieres and allow all crud operations on this list
 */
const Matieres = () => {
  const [matieres, setMatieres] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [libelle, setLibelle] = useState("");
  const [abreviation, setAbreviation] = useState("");
  const [optionnelle, setOptionnelle] = useState("Non");
  const [coefficient, setCoefficient] = useState("1"); // Valeur par défaut
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [majMessage, setMajMessage] = useState(null);
  const [majIsSucces, setMajIsSucces] = useState(false);
  const [typeFiliere, setTypeFiliere] = useState("Genie Logiciel");
  const [typeParcours, setTypeParcours] = useState("Licence");

  const handleEditClick = (index, matiere) => {
    setEditIndex(index);
    setEditData({ ...matiere });
  };

  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Saving the mdifications
  const handleSave = (index) => {
    const updatedMatieres = [...matieres];
    updatedMatieres[index] = editData;
    setMatieres(updatedMatieres);
    setEditIndex(null);

    //
    MatiereService.updateMatiere(editData)
      .then((response) => {
        console.log(" Mise a jour ..");
        setMajMessage(`Matiere ${editData.libelle} mise a jour avec succes !`);
        setMajIsSucces(true);
      })
      .catch((error) => {
        setMajMessage(`Erreur lors de la mise a jour !`);
        setMajIsSucces(false);
      });
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  // Deleting a matiere
  const handleDelete = (index) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette matière ?")) {
      setMatieres(matieres.filter((_, i) => i !== index));
    }
    //
    const matiereDeleted = matieres[index];
    MatiereService.deleteMatiere(matiereDeleted.id)
      .then((response) => {
        console.log(" Suppression ..");
        setMajMessage(
          `Suppression de la matiere ${matiereDeleted.libelle} effectuee avec succes !`
        );
        setMajIsSucces(true);
      })
      .catch((error) => {
        setMajMessage(`Erreur lors de la suppression !`);
        setMajIsSucces(false);
      });
  };

  const handleAdd = () => {
    const computeId = matieres.length + 1;
    let newMatiere = {
      id: computeId.toString(),
      libelle,
      abreviation,
      optionnelle,
    };
    newMatiere.optionnelle = newMatiere.optionnelle == "Oui" ? "1" : "0";
    console.log("optionnelle : " + newMatiere.optionnelle);
    setMatieres([...matieres, newMatiere]);
    setLibelle("");
    setAbreviation("");
    setOptionnelle("Non");

    MatiereService.addMatiere(newMatiere)
      .then((response) => {
        console.log(" ajout ..");
        setMajMessage(`Matiere ajoutee effectuee avec succes !`);
        setMajIsSucces(true);
      })
      .catch((error) => {
        setMajMessage(`Erreur lors de la Creation de la matiere !`);
        setMajIsSucces(false);
      });
  };

  // Get all the matieres from the backend
  useEffect(() => {
    MatiereService.getAllMatiere()
      .then((response) => {
        console.log("🚀 Reponse brute de l'API :", response[0]);
        console.log(Array.isArray(response));
        setMatieres(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  // fonction pour importer et traiter le fichier excel
  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Veuillez sélectionner un fichier Excel.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      try {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Vérification de la présence des colonnes attendues
        const requiredColumns = [
          "libelle",
          "abreviation",
          "optionnelle",
          "coefficient",
        ];
        const sheetColumns = Object.keys(jsonData[0] || {});

        // Vérifier si toutes les colonnes nécessaires existent dans le fichier
        const isValidStructure = requiredColumns.every((col) =>
          sheetColumns.includes(col)
        );
        if (!isValidStructure) {
          alert(
            "Le fichier Excel ne correspond pas à la structure attendue. Assurez-vous qu'il contient les colonnes 'libelle', 'abreviation' et 'optionnelle'."
          );
          return;
        }

        // Valider et formater les données
        const formattedData = jsonData
          .map((row) => {
            if (!row.libelle || !row.abreviation || !row.optionnelle) {
              alert("Certaines données sont manquantes dans le fichier Excel.");
              return null;
            }
            const optionnelleValue = row.optionnelle === "Oui" ? "Oui" : "Non";
            return {
              libelle: row.libelle,
              abreviation: row.abreviation,
              optionnelle: optionnelleValue,
            };
          })
          .filter((item) => item !== null); // On filtre les entrées nulles

        // Mettre à jour l'état avec les données importées
        setMatieres((prevMatieres) => [...prevMatieres, ...formattedData]);
      } catch (error) {
        alert(
          "Erreur de lecture du fichier Excel. Assurez-vous qu'il soit valide."
        );
      }
    };
    reader.onerror = () => {
      alert("Erreur lors de l'ouverture du fichier.");
    };
    reader.readAsBinaryString(file);
  };

  // fonction pour importer le fichier excel et le mettre dans un fichier .json
  const importExcelAndSaveAsJSON = (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("Veuillez sélectionner un fichier Excel.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      // Validation des colonnes attendues
      const expectedHeaders = ["libelle", "abreviation", "optionnelle"];
      const headersMatch = expectedHeaders.every(
        (header) => header in jsonData[0]
      );

      if (!headersMatch) {
        alert(
          "Le format du fichier est invalide. Veuillez respecter les colonnes : libelle, abreviation, optionnelle."
        );
        return;
      }

      const formattedData = jsonData.map((item, index) => ({
        id: Date.now() + index,
        libelle: item.libelle,
        abreviation: item.abreviation,
        optionnelle: item.optionnelle === 1 || item.optionnelle === "1" ? 1 : 0,
      }));

      // Création du fichier JSON
      const blob = new Blob([JSON.stringify(formattedData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      // Création d'un lien pour forcer le téléchargement
      const a = document.createElement("a");
      a.href = url;
      a.download = "matieres_importees.json";
      a.click();

      // Libère l’URL une fois le fichier téléchargé
      URL.revokeObjectURL(url);
    };

    reader.readAsBinaryString(file);
  };

  // fonction pour exporter les donnees en fichier excel
  const exportMatieresToExcel = (matieres) => {
    const worksheet = XLSX.utils.json_to_sheet(matieres);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Matieres");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    const now = new Date();
    const timestamp = now
      .toISOString()
      .slice(0, 16)
      .replace("T", "_")
      .replace(":", "-");
    link.download = `matieres_${timestamp}.xlsx`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
          ⚠️Impossible de récupérer la liste. erreur serveur
        </div>
      </div>
    );
  } else {
    // Return the content of the page
    return (
      <div className="flex-grow">
        <div className="sm:flex sm:flex-col sm:items-center xl:flex">
          <div className="p-6 bg-transparent w-full h-full flex flex-col xl:flex-row gap-6">
            {/* Tableau des matières */}
            <div className="flex flex-col rounded-sm w-full h-full shadow-sm">
              <div className=" bg-white sticky top-0 z-2 flex items-center justify-between  mb-5 p-3">
                <h2 className="md:text-lg lg:text-xl text-md font-bold text-center">
                  Liste des matières
                </h2>

                <div className="flex items-center gap-2">
                  <div>
                    <select
                      value={typeParcours}
                      onChange={(e) => setTypeParcours(e.target.value)}
                      className="p-2 border-none rounded-md shadow-sm text-sm"
                    >
                      <option value="admis">Licence</option>
                      <option value="echoues">Master</option>
                    </select>
                  </div>
                  <div>
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
                  </div>
                </div>
              </div>
              <div className="h-[350px] overflow-y-auto pl-4 pr-4 pb-3 flex flex-col w-full">
                <table className="text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="lg:px-4 lg:py-2 sm:px-2 sm:py-1 text-gray-700 text-sm text-center">
                        CODE
                      </th>
                      <th className="lg:px-4 lg:py-2 sm:px-2 sm:py-1 text-gray-700 text-sm text-center">
                        LIBELLE
                      </th>
                      <th className="lg:px-4 lg:py-2 sm:px-2 sm:py-1 text-gray-700 text-sm text-center">
                        ABRÉVIATION
                      </th>
                      <th className="lg:px-4 lg:py-2 sm:px-2 sm:py-1 text-gray-700 text-sm text-center">
                        OPTIONNELLE
                      </th>
                      <th className="lg:px-4 lg:py-2 sm:px-2 sm:py-1 text-gray-700 text-sm text-center">
                        ACTIONS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {matieres.map((matiere, index) => (
                      <tr
                        key={matiere.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                      >
                        {editIndex === index ? (
                          <>
                            <td className="text-sm px-2 py-1 text-center">
                              {`MAT${matieres.length + 1}${matiere.id}`}
                            </td>
                            <td className="text-sm px-2 py-1 text-center">
                              <input
                                type="text"
                                className="w-full p-1 border rounded"
                                value={editData.libelle}
                                onChange={(e) =>
                                  handleInputChange(e, "libelle")
                                }
                              />
                            </td>
                            <td className="text-sm px-2 py-1 text-center">
                              <input
                                type="text"
                                className="w-full p-1 border rounded"
                                value={editData.abreviation}
                                onChange={(e) =>
                                  handleInputChange(e, "abreviation")
                                }
                              />
                            </td>
                            <td className="text-sm px-2 py-1 lg:px-4 lg:py-2 text-center">
                              <select
                                className="w-full p-1 border rounded"
                                value={editData.optionnelle}
                                onChange={(e) =>
                                  handleInputChange(e, "optionnelle")
                                }
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
                            <td className="text-sm px-2 py-1 lg:px-4 lg:py-2 text-center">
                              {`MAT${matieres.length + 1}${matiere.id}`}
                            </td>
                            <td className="text-sm px-2 py-1 lg:px-4 lg:py-2 text-center">
                              {matiere.libelle}
                            </td>
                            <td className="text-sm px-2 py-1 lg:px-4 lg:py-2 text-center">
                              {matiere.abreviation}
                            </td>
                            <td className="text-sm px-2 py-1 lg:px-4 lg:py-2 text-center">
                              {matiere.optionnelle == 1 ? "Oui" : "Non"}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <div className="flex gap-2 justify-center">
                                <button
                                  className="text-blue-500 hover:text-blue-700"
                                  onClick={() =>
                                    handleEditClick(index, matiere)
                                  }
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
            </div>
            {/* FORMULAIRE D'AJOUT */}
            <div className="bg-white w-full shadow-md rounded-lg p-6 w-1/3 h-1/3">
              <h2 className="text-lg font-bold mb-4">Créer une matière</h2>
              <label className="block mb-2 text-sm font-semibold">
                Libellé
              </label>
              <input
                type="text"
                className="w-full p-1 border rounded mb-3"
                placeholder="Ex: Mathématiques"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
              />
              <label className="block mb-2 text-sm font-semibold">
                Abréviation
              </label>
              <input
                type="text"
                className="w-full p-1 border rounded mb-3"
                placeholder="Ex: MATH"
                value={abreviation}
                onChange={(e) => setAbreviation(e.target.value)}
              />
              <label className="block mb-2 text-sm font-semibold">
                Optionnelle
              </label>
              <select
                className="w-full p-1 border rounded mb-3"
                value={optionnelle}
                onChange={(e) => setOptionnelle(e.target.value)}
              >
                <option className="text-base" value="Oui">
                  Oui
                </option>
                <option className="text-base" value="Non">
                  Non
                </option>
              </select>
              <button
                className="w-full p-2 cursor-pointer bg-blue-500 text-white text-sm font-bold lg:p-1 md:px-4 md:py-2 rounded-lg hover:bg-blue-600"
                onClick={handleAdd}
              >
                Ajouter
              </button>
            </div>
          </div>
          {/* Boutons d'action */}
          {majMessage && (
            <div
              className={`p-4 my-4 rounded shadow text-center ${
                majIsSucces
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {majMessage}
            </div>
          )}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4 lg:mt-6 lg:w-full md:flex md:gap-2 sm:flex sm:gap-2">
            <button className="px-2 py-2 md:w-72 lg:w-full w-full bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 cursor-pointer">
              Imprimer la liste
            </button>

            <label className="flex flex-row items-center justify-center gap-2 md:w-72  lg:w-full sm:w-full px-2 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
              <FiUpload className="text-xl" />
              <span className="text-sm font-medium">
                Importer un fichier Excel
              </span>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleImportExcel}
                className="hidden"
              />
            </label>

            <input
              type="number"
              min="1"
              max="10"
              step="1"
              placeholder="1"
              className="w-full p-1 border rounded"
              value={editData.coefficient}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                // Vérifie si c’est un nombre et s’il est entre 1 et 10
                if (!isNaN(value) && value >= 1 && value <= 10) {
                  handleInputChange(e, "coefficient");
                }
              }}
            />

            <button
              onClick={() => exportMatieresToExcel(matieres)}
              className="px-2 py-2 w-full bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 cursor-pointer"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    );
  }
};
export default Matieres;
