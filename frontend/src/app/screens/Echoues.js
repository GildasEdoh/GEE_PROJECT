"use client";

import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import EtudiantService from "@/services/EtudiantService";
import AnneesEtudeService from "@/services/AnneesEtudeService";
import FiliereService from "@/services/FiliereService";
import {
  getGrades,
  getSessionIndex,
  getAnneeEtudeIndex,
  getAnneeUnivIndex,
} from "../utils/parseAnnee";
import {
  generatePDF,
  exportEtudiantsToExcel,
  getParcoursAnneeEtudeId,
} from "../utils/ExcelUtils.js";
import showNotification from "../utils/showMessage";
import toast, { Toaster } from "react-hot-toast";

const Echoues = () => {
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
  var anneeUnivCouranteId = 2;
  var filiereCouranteId = 3;
  var sessionCouranteId = 1;
  var anneeCurId = 6;
  var etabCourantId = 1;

  const getEtudiant = () => {
    // Get the list of students
    console.log(
      "anneeUnivCouranteId = " +
        anneeUnivCouranteId +
        ", sessionCouranteId = " +
        sessionCouranteId +
        ", anneeEtudeCourante = " +
        typeAnneEtude +
        ", filireCouranteId = " +
        filiereCouranteId +
        ", anneeCurId = " +
        anneeCurId
    );

    EtudiantService.getEtudiantByFiltre(
      etabCourantId,
      filiereCouranteId,
      anneeCurId,
      anneeUnivCouranteId,
      sessionCouranteId
    )
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
  };

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
    const anneeUniv = JSON.parse(localStorage.getItem("anneeUnivCourante"));
    const sessionCourante = JSON.parse(localStorage.getItem("sessionCourante"));

    const anneesUniv = JSON.parse(localStorage.getItem("annees"));
    const sessions = JSON.parse(localStorage.getItem("sessions"));
    const anneesEtudes = JSON.parse(localStorage.getItem("anneesEtude"));

    const anneeCur = typeParcours + " " + typeAnneEtude;

    if (
      anneeUniv &&
      sessionCourante &&
      anneesUniv &&
      sessions &&
      anneesEtudes
    ) {
      anneeUnivCouranteId = getAnneeUnivIndex(anneeUniv, anneesUniv);
      filiereCouranteId = idtypeFiliere;
      sessionCouranteId = getSessionIndex(sessionCourante, sessions);
      anneeCurId = getAnneeEtudeIndex(anneeCur, anneesEtudes);
    }
    setIsLoading(true);
    getEtudiant();
  };
  useEffect(() => {
    updateEtudiant();
  }, [typeParcours, typeAnneEtude, idtypeFiliere]);

  const etudiantsAvecMoyenne = etudiants.map((etudiant) => ({
    ...etudiant,
    moyenneAleatoire: parseFloat((Math.random() * 9).toFixed(2)),
  }));

  // Trier par moyenne décroissante
  etudiantsAvecMoyenne.sort((a, b) => b.moyenneAleatoire - a.moyenneAleatoire);

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
            <h1 className="text-2xl font-bold"> Liste des Étudiants Echoués </h1>
              
            <div className="flex items-center gap-4">
              <div>
                <select
                  value={typeParcours}
                  onChange={(e) => {
                    setTypeParcours(e.target.value);
                  }}
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
                    Sexe
                  </th>

                  <th className="px-4 py-2 text-gray-700 text-sm text-center">
                    Moyenne
                  </th>
                </tr>
              </thead>
              <tbody>
                {etudiantsAvecMoyenne.map((etudiant, index) => (
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
                          {etudiant.sexe}
                        </td>

                        <td className="px-4 py-2 text-center">
                          {etudiant.moyenneAleatoire}
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
              onClick={() => generatePDF(etudiants, "Liste des Étudiants")}
            >
              Imprimer la liste
            </button>

            <button
              onClick={() => exportEtudiantsToExcel(etudiants)}
              className="px-2 py-2 w-full bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 cursor-pointer"
            >
              Exporter au format excel
            </button>
          </div>
        </div>
        <Toaster />
      </div>
    );
  }
};

export default Echoues;
