
'use client';

import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import EtudiantService from "@/services/EtudiantService";
import AnneesEtudeService from "@/services/AnneesEtudeService";
import FiliereService from "@/services/FiliereService";
import { getGrades, getSessionIndex, getAnneeEtudeIndex, getAnneeUnivIndex, getFiliereLibelle } from "../utils/parseAnnee";
import { generatePDF, importEtudiantToExcel, exportEtudiantsToExcel, getParcoursAnneeEtudeId, buildInscriptionsList, sleep} from "../utils/ExcelUtils.js";
import InscriptionService from "@/services/InscriptionService";
import showNotification from '../utils/showMessage';
import toast, { Toaster } from 'react-hot-toast';


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
  const [filieres, setFilieres] = useState([]);

  // Variables
  var grades = [];
  var anneeUnivCouranteId = 2;
  var filiereCouranteId = 3;
  var sessionCouranteId = 1;
  var anneeCurId = 6;
  var etabCourantId = 1;
  var parcoursCourant = "";

  // var localEtab = JSON.parse(localStorage.getItem('etablissementCourantId'));
  // if (localEtab) {
  //   console.log("parseur : ", localEtab);
  //   etabCourantId = parseInt(localEtab);
  // }

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
        showNotification(`Étudiant ${deleteEtudiant.nom} supprimé avec succès`, 'success');
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
        showNotification(`Étudiant "${editedData.nom} ${editedData.prenom}" modifié avec succès`, 'success');
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
    const anneeUniv = JSON.parse(localStorage.getItem("anneeUnivCourante"));
    const anneesUniv = JSON.parse(localStorage.getItem("annees"));
    const waning_duration = 9000;
    // showNotification(`Les parcours doivent etre au format: "SUP - Grade Filiere anneeEtude, ex: CAPACITE droit 1 ...." `, 'warning', waning_duration);
    sleep(waning_duration);

    if (anneesUniv) {
      anneeUnivCouranteId = getAnneeUnivIndex(anneeUniv, anneesUniv);
    }
    
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
        id_etablissement: etabCourantId,
        Nationalite: e.Nationalite,
        Tel_2: "",
        ville: "",
        quartier: "",
        rue: ""
      }));
      console.log("etudiantsList :", etudiantsList);
      
      const inscriptionsList = await buildInscriptionsList(etudiantsData, anneeUnivCouranteId);
      setIsLoading(false);
      const userConfirmed = await toast.promise(
        new Promise((resolve, reject) => {
          const toastId = toast.custom((t) => (
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="font-bold text-lg">Confirmer l'insertion</h3>
              <p className="my-4">
                Voulez-vous vraiment inscrire {etudiantsData.length} étudiants pour l'année universitaire: {anneeUniv} ?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    toast.dismiss(toastId);
                    reject(new Error('Annulation utilisateur')); // Seulement reject ici
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    toast.dismiss(toastId);
                    resolve(true); // Seulement resolve ici
                  }}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                >
                  Confirmer
                </button>
              </div>
            </div>
          ), {
            duration: Infinity
          });
        }),
        {
          loading: 'Validation en cours...',
          error: (err) => err.message === 'Annulation utilisateur' 
            ? 'Inscription annulée' 
            : 'Erreur lors de la confirmation',
          success: 'Validation acceptée'
        }
      );

        setIsLoading(true);
        if (userConfirmed) {
            // Insertion des etudiants
            console.log('insertion etudiants: ');
            
            try {
                const res  = await EtudiantService.addAllEtudiant(etudiantsList);
                console.log("res: ", res); // Exemple : { id: 28 }
                console.log("Etudiant enregestrées avec succes ");
                showNotification(`Vous avez inséré "${etudiantsList.length}" avec succes `, 'success');
            } catch (err) {
                console.error("Erreur Insert :", err);
                showNotification("Erreur inscription", "error");
            }
            setEtudiants(etudiantsList);
            // Inscription des etudiants
            console.log('Insertion inscriptions: ');
            try {
              const res = await InscriptionService.insertAll(inscriptionsList);
              showNotification("Etudiants inscrits avec succes", "success");
              console.log("Résultat:", res);
            } catch (err) {
              showNotification("Erreur inscription", "error");
              console.error("Erreur:", err);
            }

        }
    } catch (error) {
      showNotification(error.message, 'error');
      console.log("Erreur:", error.message);
    }
    setIsLoading(false);
  };

  const launchPrint = () => {
    if (etudiants.length == 0) {
      showNotification(`Aucun étudiant à imprimer !`, 'warning');
    }
    generatePDF(etudiants, "Liste des Étudiants");
  }

  const launchExport = () => {
    if (etudiants.length == 0) {
      showNotification(`Aucun étudiant à imprimer !`, 'warning');
    }
    exportEtudiantsToExcel(etudiants);
  }

  const getEtudiant = () => {
  // Get the list of students
    console.log("anneeUnivCouranteId = " + anneeUnivCouranteId +
      ", sessionCouranteId = " + sessionCouranteId +
      ", anneeEtudeCourante = " + typeAnneEtude +
      ", filireCouranteId = " + filiereCouranteId +
      ", anneeCurId = " + anneeCurId);

    EtudiantService.getEtudiantByFiltre(etabCourantId, filiereCouranteId, anneeCurId, anneeUnivCouranteId, sessionCouranteId)
      .then((response) => {
        console.log("🚀 Reponse brute de l'API :", response[0]);
        if (response.length == 0) {
          console.log("liste vide");
        }
        setEtudiants(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  }

  
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
      setFilieres(JSON.parse(filiereData));
    } else {
      FiliereService.getAllFiliere()
        .then((response) => {
          setIsLoading(false);
          localStorage.setItem("filieres", JSON.stringify(response));
          setFilieres(response);
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

    const anneesUniv = JSON.parse(localStorage.getItem("annees"));
    const sessions = JSON.parse(localStorage.getItem("sessions"));
    const anneesEtudes = JSON.parse(localStorage.getItem("anneesEtude"));

    const anneeCur = typeParcours + " " + typeAnneEtude;
    if (idtypeFiliere && filieres) {
      parcoursCourant = getFiliereLibelle(idtypeFiliere, filieres);
      localStorage.setItem("parcoursCourant", JSON.stringify(parcoursCourant));
    }
    // console.log("----- gog --- ", anneeCur);

    if (anneeUniv && sessionCourante && anneesUniv && sessions && anneesEtudes) {
          anneeUnivCouranteId = getAnneeUnivIndex(anneeUniv, anneesUniv);
          filiereCouranteId = idtypeFiliere;
          sessionCouranteId = getSessionIndex(sessionCourante, sessions);
          anneeCurId = getAnneeEtudeIndex(anneeCur, anneesEtudes);
    }
    setIsLoading(true);
    getEtudiant();
  }
    useEffect(() => {
      updateEtudiant();
    }, [typeParcours, typeAnneEtude, idtypeFiliere]);

  // 
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
                  }}
                  className="p-2 border-none rounded-md shadow-sm text-sm"
                >
                  {filieres.length == 0 ? (
                    <option value="--">------------</option>
                  ) : (
                    filieres.map((f) => (
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
                    setypeAnneEtude(e.target.value);
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
                                Tel_1: e.target.value,
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
              className="px-2 py-2 w-full bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 cursor-pointer"
              onClick={launchPrint}
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
              onClick={launchExport}
              className="px-2 py-2 w-full bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 cursor-pointer">
              Exporter au format excel
            </button>
          </div>
        </div>
        <Toaster />
      </div>
    );
  }
};

export default Etudiants;
