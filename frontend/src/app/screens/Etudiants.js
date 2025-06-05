import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import EtudiantService from "@/services/EtudiantService";
import AnneesEtudeService from "@/services/AnneesEtudeService";
import FiliereService from "@/services/FiliereService";
import * as XLSX from "xlsx";
import { getGrades, getSessionIndex, getAnneeEtudeIndex, getAnneeUnivIndex } from "../utils/parseAnnee";
import {
  generatePDF,
  importEtudiantToExcel,
  exportEtudiantsToExcel,
} from "../utils/ExcelUtils.js";
import InscriptionService from "@/services/InscriptionService";

const Etudiants = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [majMessage, setMajMessage] = useState(null);
  const [majIsSucces, setMajIsSucces] = useState(false);
  const [idtypeFiliere, setIdTypeFiliere] = useState("3");
  const [typeParcours, setTypeParcours] = useState("CAPACITE");
  const [typeAnneEtude, setypeAnneEtude] = useState("1");
  const [etudiants, setEtudiants] = useState([]);
  const [anneesEtude, setAnneesEtude] = useState([]);
  const [filiere, setFiliere] = useState([]);
  // Variables
  var grades = [];
  var anneeUnivCouranteId = 1;
  var filiereCouranteId = 3;
  var sessionCouranteId = 1
  var anneeCurId = 6
  var etabCourantId = 1

  // Submission of the suppression
  const handleDeleteEtudiant = (index) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      setEtudiants(etudiants.filter((_, i) => i !== index));
    }
    const deleteEtudiant = etudiants[index];
    //
    EtudiantService.deleteEtudiant(deleteEtudiant.numero_carte)
      .then((res) => {
        setMajMessage(
          `Suppression de l'etudiant ${deleteEtudiant.nom} effectuee avec succes !`
        );
        setMajIsSucces(true);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setMajMessage("Échec de la Suppression.");
        setMajIsSucces(false);
      });
  };

  const handleEditEtudiant = (index) => {
    setEditIndex(index);
    setEditedData(etudiants[index]);
    const etudiant = etudiants[index];
    console.log("etudiant: " + etudiant.numero_carte);
  };

  // Submission of the edition
  const handleSaveEdit = (index) => {
    const updatedEtudiants = [...etudiants];
    updatedEtudiants[index] = editedData;
    console.log("etudiant updated : " + editedData.numero_carte);
    setEtudiants(updatedEtudiants);
    setEditIndex(null);

    // Maj student
    EtudiantService.updateEtudiant(editedData)
      .then((res) => {
        setMajMessage("Mise à jour réussie !");
        setMajIsSucces(true);
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setMajMessage("Échec de la mise à jour.");
        setMajIsSucces(false);
      });
  };


  const launchImport = async (e) => {
    setIsLoading(true);
    console.log("Un fichier a été sélectionné");
    const anneeUniv = JSON.parse(localStorage.getItem("anneeUnivCourante"))
    try {
      const etudiantsData = await importEtudiantToExcel(e);

      const etudiantsList = etudiantsData.map((e) => ({
        numero_carte: parseInt(e.numero_carte.replace(',', '')),
        nom: e.nom,
        prenom: e.prenom,
        date_naissance: e.date_naissance,
        lieu_naissance: e.lieu_naissance,
        sexe: e.sexe,
        Tel_1: e.Tel_1,
        id_etablissement: 1,
        Nationalite: e.Nationalite,
        Tel_2: "",
        ville: "",
        quartier: "",
        rue: ""
      }));
      console.log("etudiantsList :", etudiantsList);
      
      // // Insertion des etudiants
      console.log('insertion etudiants: ');
      try {
          const res  = await EtudiantService.addAllEtudiant(etudiantsList);
          rconsole.log("res: ", res); // Exemple : { id: 28 }
      } catch (err) {
          console.error("Erreur Insert :");
      }
      setEtudiants(etudiantsList);
      
      const inscriptionsList = await buildInscriptionsList(etudiantsData, anneeUniv);
      console.log("inscriptionsList :", inscriptionsList);
      setIsLoading(false);
      
      // console.log('insertion inscriptions: ');
      // // inscription des etudiants
      // try {
      //       const res  = await InscriptionService.insertAll(inscriptionsList);
      //       rconsole.log("res: ", res); // Exemple : { id: 28 }
      //   } catch (err) {
      //       console.error("Erreur Insert :");
      //   }

      // ici tu peux faire ce que tu veux avec inscriptionsList
    } catch (error) {
      console.error("Erreur d'import:", error);
    }
  };

  const getParcoursAnneeEtudeId = async (parcours) => {
    const parcoursLibelle = parcours.replace("SUP - ", "");
    try {
      const res = await InscriptionService.getParcoursIdBylibelle(parcoursLibelle);
      return res; // Exemple : { id: 28 }
    } catch (err) {
      console.error("Erreur lors de la récupération du parcours pour :", parcoursLibelle);
      return { id: 0 };
    }
  };
  const buildInscriptionsList = async (etudiantsData, anneeUniv) => {
    // On récupère tous les IDs de parcours en parallèle
    const parcoursIds = await Promise.all(
      etudiantsData.map((e) => getParcoursAnneeEtudeId(e.parcours))
    );

    // On construit la liste des inscriptions avec les bons IDs
    const inscriptionsList = etudiantsData.map((e, index) => ({
      fk_annee_univ: anneeUniv,
      fk_etudiant: parseInt(e.numero_carte.replace(',', '')),
      fk_parcours_annee_etude: parcoursIds[index]?.id ?? 0, // au cas où l’id serait null
    }));

    console.log("inscriptionsList:", inscriptionsList);
    return inscriptionsList;
  };

  // Get the list of students
  useEffect(() => {
    updateEtudiant();
    EtudiantService.getEtudiantByFiltre(etabCourantId, filiereCouranteId, anneeCurId, anneeUnivCouranteId, sessionCouranteId)
      .then((response) => {
        // console.log("🚀 Reponse brute de l'API :", response[0]);
        // console.log(Array.isArray(response));
        setEtudiants(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  }, [typeParcours, typeAnneEtude, idtypeFiliere]);

  // Get the list of students
  useEffect(() => {
    const anneeData = localStorage.getItem("anneesEtude");
    const filiereData = localStorage.getItem("filieres");
    //
    if (anneeData) {
      // console.log("🚀 ---- anneeData local --- :");
      setAnneesEtude(JSON.parse(anneeData));
    } else {
      AnneesEtudeService.getAllAnneesEtude()
        .then((response) => {
          // console.log("🚀 ---- AnneesEtude --- :", response[0]);
          console.log(Array.isArray(response));
          setIsLoading(false);
          localStorage.setItem("anneesEtude", JSON.stringify(response));
          setAnneesEtude(response);
        })
        .catch((error) => {
          console.error("Erreur :", error);
          setIsLoading(false);
          setError(true);
        });
    }
    // Filiere data
    if (filiereData) {
      // console.log("🚀 ---- filiereData local --- :");
      setFiliere(JSON.parse(filiereData));
    } else {
      FiliereService.getAllFiliere()
        .then((response) => {
          setIsLoading(false);
          localStorage.setItem("filieres", JSON.stringify(response));
          setFiliere(response);
        })
        .catch((error) => {
          console.error("Erreur :", error);
          setIsLoading(false);
          setError(true);
        });
    }
  }, []);

  const updateEtudiant = () => {
    // Reconstitution du parcours
    const anneeUniv = JSON.parse(localStorage.getItem("anneeUnivCourante"))
    const sessionCourante = JSON.parse(localStorage.getItem("sessionCourante"))

    const anneesUniv = JSON.parse(localStorage.getItem("annees"))
    const sessions = JSON.parse(localStorage.getItem("sessions"))
    const anneesEtudes = JSON.parse(localStorage.getItem("anneesEtude"))

    const anneeCur = typeParcours + " " + typeAnneEtude

    anneeUnivCouranteId = getAnneeUnivIndex(anneeUniv, anneesUniv);
    filiereCouranteId = idtypeFiliere;
    sessionCouranteId = getSessionIndex(sessionCourante, sessions);
    anneeCurId = getAnneeEtudeIndex(anneeCur, anneesEtudes);

    console.log("anneeUnivCouranteId = " + anneeUnivCouranteId +
        ", sessionCouranteId = " + sessionCouranteId +
        ", anneeEtudeCourante = " + typeAnneEtude +
        ", filireCouranteId = " + filiereCouranteId +
        ", anneeCurId = " + anneeCurId);
    setIsLoading(true);
  }

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
    {
      anneesEtude.length != 0 ? (grades = getGrades(anneesEtude)) : [];
    }
    return (
      <div className="flex-grow">
        <div className="flex flex-col">
          <div className="bg-white flex items-center z-4 pt-3 pb-3  pr-4 justify-between">
            <h1 className="text-2xl font-bold">Liste des Étudiants</h1>

            <div className="flex items-center gap-4">
              <div>
                <select
                  value={typeParcours}
                  onChange={(e) => {
                    setTypeParcours(e.target.value);
                    // console.log('----- parcours ---  ', e.target.value);
                    // localStorage.setItem("gradeCourant", JSON.stringify(e.target.value));
                    updateEtudiant()
                    }
                  }
                  className="p-2 border-none rounded-md shadow-sm text-sm"
                >
                  {grades.length == 0 ? (
                    <option value="--">-----------</option>
                  ) : (
                    
                    grades.map((g, index) => (
                      <option key={index} value={g}>
                        {g}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <select
                  value={idtypeFiliere}
                  onChange={(e) => {
                    setIdTypeFiliere(e.target.value);
                    // console.log('----- filiere---  ', e.target.value);
                    // localStorage.setItem("filiereCourante", JSON.stringify(e.target.value));
                    updateEtudiant()
                  }}
                  className="p-2 border-none rounded-md shadow-sm text-sm"
                >
                  {filiere.length == 0 ? (
                    <option value="--">------------</option>
                  ) : (
                    filiere.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.libelle}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <select
                  value={typeAnneEtude}
                  onChange={(e) => {
                    setypeAnneEtude(e.target.value)
                    // console.log('----- type annee---  ', e.target.value);
                    // localStorage.setItem("anneeEtudeCourante", JSON.stringify(e.target.value));
                    updateEtudiant()
                  }}
                  className="p-2 border-none rounded-md shadow-sm text-sm"
                >
                  <option value="1">1ere année</option>
                  <option value="2">2eme année</option>
                </select>
              </div>
            </div>
          </div>
          <div className="h-[400px] overflow-y-auto mt-8">
            <table className="w-full border-collapse border rounded-xl shadow-md">
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
                    Date de Naissance
                  </th>
                  <th className="px-4 py-2 text-gray-700 text-sm text-center">
                    Lieu de Naissance
                  </th>
                  <th className="px-4 py-2 text-gray-700 text-sm text-center">
                    Sexe
                  </th>
                  <th className="px-4 py-2 text-gray-700 text-sm text-center">
                    Téléphone
                  </th>
                  <th className="px-4 py-2 text-gray-700 text-sm text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {etudiants.map((etudiant, index) => (
                  <tr
                    key={etudiant.numero_carte}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    {editIndex === index ? (
                      <>
                        <td className=" px-0 py-2 ">{etudiant.numero_carte}</td>
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
                            value={editedData.prenom}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                prenom: e.target.value,
                              })
                            }
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            value={editedData.date_naissance}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                date_naissance: e.target.value,
                              })
                            }
                            className="border p-1 w-full"
                          />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            value={editedData.lieu_naissance}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                lieu_naissance: e.target.value,
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
                            value={editedData.Tel_1}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                telephone: e.target.value,
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
                          {" "}
                          {etudiant.numero_carte}{" "}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {" "}
                          {etudiant.nom}{" "}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {" "}
                          {etudiant.prenom}{" "}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {" "}
                          {etudiant.date_naissance}{" "}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {" "}
                          {etudiant.lieu_naissance}{" "}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {etudiant.sexe}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {" "}
                          {etudiant.Tel_1}{" "}
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
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4 mt-8 w-full md:flex md:gap-2 gap-2">
            <button
              className="px-2 py-2 w-full bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 cursor-pointer"
              onClick={() => generatePDF(etudiants, "Liste des Étudiants")}
            >
              Imprimer la liste
            </button>

            <label className="flex flex-row items-center justify-center gap-2  w-full px-2 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
              <FiUpload className="text-xl" />
              <span className="text-sm font-medium">
                Importer un fichier Excel
              </span>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={launchImport}
                className="hidden"
              />
            </label>

            <button
              onClick={() => exportEtudiantsToExcel(etudiants)}
              className="px-2 py-2 w-full bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 cursor-pointer"
            >
              Exporter au format excel
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Etudiants;
