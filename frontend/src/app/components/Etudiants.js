import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import EtudiantService from "@/services/EtudiantService";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
/**
 * Return the page which contains the table of students
 */

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([
    {
      numero_carte: "123456",
      nom: "Koffi",
      prenom: "Jean",
      dateNaissance: "Lome",
      lieuNaissance: "Logone",
      sexe: "M",
    },
    {
      numero_carte: "654321",
      nom: "Doe",
      prenom: "Alice",
      dateNaissance: "Lome",
      lieuNaissance: "Logone",
      sexe: "F",
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [majMessage, setMajMessage] = useState(null);
  const [majIsSucces, setMajIsSucces] = useState(false);
  const [typeFiliere, setTypeFiliere] = useState("Genie Logiciel");
  const [typeParcours, setTypeParcours] = useState("Licence");
  const [typeAnneEtude, setypeAnneEtude] = useState("Licence");

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

  // Get the list of students
  useEffect(() => {
    EtudiantService.getAllEtudiant()
      .then((response) => {
        console.log("🚀 Reponse brute de l'API :", response[0]);
        console.log(Array.isArray(response));
        setEtudiants(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  }, []);

  const generatePDF = (etudiants, titre = "Liste des Étudiants") => {
    if (!etudiants?.length) {
      alert("Aucun étudiant à imprimer !");
      return;
    }

    const doc = new jsPDF({ orientation: "landscape" }); // Mode paysage pour plus d'espace

    // Titre
    doc.setFontSize(16);
    doc.text(titre, 148, 15, { align: "center" }); // Centré en paysage (A4 landscape: 297mm)

    // En-têtes du tableau (correspondant à vos colonnes Excel)
    const headers = [
      "N°",
      "Ets",
      "Parcours",
      "Nb. insc.",
      "Carte",
      "Nom",
      "Prénoms",
      "Sexe",
      "Né le",
      "À",
      "Nationalité",
      "Tél",
      "Avant",
      "Courant",
      "Total",
      "%",
    ];

    // Données formatées
    const data = etudiants.map((etudiant) => [
      etudiant["N°"] || "",
      etudiant["Ets"] || "",
      etudiant["Parcours"] || "",
      etudiant["Nb. insc."] || "",
      etudiant["Carte"] || "",
      etudiant["Nom"] || "",
      etudiant["Prénoms"] || "",
      etudiant["Sexe"] || "",
      etudiant["Né le"] || "",
      etudiant["À"] || "",
      etudiant["Nationalité"] || "",
      etudiant["Tél"] || "",
      etudiant["Avant"] || "",
      etudiant["Courant"] || "",
      etudiant["Total"] || "",
      etudiant["%"] || "",
    ]);

    // Générer le tableau (largeur ajustée en paysage)
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 25,
      margin: { left: 10, right: 10 },
      styles: {
        fontSize: 8, // Taille réduite pour tout afficher
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: "#2c3e50",
        textColor: "#ffffff",
      },
      columnStyles: {
        0: { cellWidth: 10 }, // N°
        4: { cellWidth: 15 }, // Carte
        5: { cellWidth: 20 }, // Nom
        6: { cellWidth: 20 }, // Prénoms
        // Ajustez selon vos besoins
      },
    });

    // Télécharger
    doc.save(`${titre}.pdf`);
  };

  // fonction pour importer un fichier excel
  const handleImportEtudiantsExcel = (e) => {
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

        // Vérification des colonnes attendues
        const requiredColumns = [
          "numero_carte",
          "nom",
          "prenom",
          "dateNaissance",
          "lieuNaissance",
          "sexe",
        ];
        const sheetColumns = Object.keys(jsonData[0] || {});
        const isValidStructure = requiredColumns.every((col) =>
          sheetColumns.includes(col)
        );

        if (!isValidStructure) {
          alert(
            "Le fichier Excel ne correspond pas à la structure attendue. Assurez-vous qu'il contient les colonnes : numero_carte, nom, prenom, dateNaissance, lieuNaissance, sexe."
          );
          return;
        }

        // Valider et formater les données
        const formattedData = jsonData
          .map((row) => {
            const {
              numero_carte,
              nom,
              prenom,
              dateNaissance,
              lieuNaissance,
              sexe,
            } = row;

            if (
              !numero_carte ||
              !nom ||
              !prenom ||
              !dateNaissance ||
              !lieuNaissance ||
              !sexe
            ) {
              alert(
                "Certaines données sont manquantes dans le fichier Excel. Veuillez vérifier chaque ligne."
              );
              return null;
            }

            // Vérifie le sexe (doit être 'M' ou 'F')
            const sexeValide = ["M", "F"].includes(sexe.toUpperCase());
            if (!sexeValide) {
              alert(`Sexe invalide pour l'étudiant ${nom} ${prenom}.`);
              return null;
            }

            return {
              carte: numero_carte.toString(),
              nom,
              prenoms: prenom,
              sexe: sexe.toUpperCase(),
              moyenne: 0, // initialisé à 0 si non précisé
            };
          })
          .filter((etudiant) => etudiant !== null);

        // Mettre à jour l'état
        setEtudiants((prev) => [...prev, ...formattedData]);
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

  // fonction pour importer le fichier excel et telecharger en .json
  // const handleImportExcelToJson = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) {
  //     alert("Veuillez sélectionner un fichier Excel.");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onload = (evt) => {
  //     const data = evt.target.result;

  //     try {
  //       const workbook = XLSX.read(data, { type: "binary" });
  //       const sheetName = workbook.SheetNames[0];
  //       const sheet = workbook.Sheets[sheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  //       // Colonnes attendues selon le fichier Excel fourni
  //       const requiredColumns = [
  //         "Carte",
  //         "Nom",
  //         "Prénoms",
  //         "Né le",
  //         "À",
  //         "Sexe",
  //       ];

  //       const sheetColumns = Object.keys(jsonData[0] || {});
  //       const isValidStructure = requiredColumns.every((col) =>
  //         sheetColumns.includes(col)
  //       );

  //       if (!isValidStructure) {
  //         alert(
  //           `Le fichier Excel ne correspond pas à la structure attendue.\nIl doit contenir les colonnes suivantes : ${requiredColumns.join(
  //             ", "
  //           )}`
  //         );
  //         return;
  //       }

  //       const formattedData = jsonData
  //         .map((row) => {
  //           const {
  //             Carte,
  //             Nom,
  //             Prénoms,
  //             "Né le": dateNaissance,
  //             À: lieuNaissance,
  //             Sexe,
  //           } = row;

  //           if (
  //             !Carte ||
  //             !Nom ||
  //             !Prénoms ||
  //             !dateNaissance ||
  //             !lieuNaissance ||
  //             !Sexe
  //           ) {
  //             alert(
  //               `Ligne incomplète détectée : ${JSON.stringify(row)}. Ignorée.`
  //             );
  //             return null;
  //           }

  //           const sexeNormalise = Sexe.toString().trim().toUpperCase();
  //           if (!["M", "F"].includes(sexeNormalise)) {
  //             alert(
  //               `Sexe invalide (${Sexe}) pour l'étudiant : ${Nom} ${Prénoms}.`
  //             );
  //             return null;
  //           }

  //           return {
  //             carte: Carte.toString().trim(),
  //             nom: Nom.toString().trim(),
  //             prenoms: Prénoms.toString().trim(),
  //             dateNaissance: dateNaissance.toString().trim(),
  //             lieuNaissance: lieuNaissance.toString().trim(),
  //             sexe: sexeNormalise,
  //           };
  //         })
  //         .filter((etudiant) => etudiant !== null);

  //       console.log("Etudiants importés :", formattedData);

  //       const blob = new Blob([JSON.stringify(formattedData, null, 2)], {
  //         type: "application/json",
  //       });
  //       const url = URL.createObjectURL(blob);

  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.download = "etudiants_importes.json";
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     } catch (error) {
  //       alert("Erreur de lecture du fichier Excel.");
  //       console.error(error);
  //     }
  //   };

  //   reader.onerror = () => {
  //     alert("Erreur lors de l'ouverture du fichier.");
  //   };

  //   reader.readAsBinaryString(file);
  // };
  const handleImportExcelToJson = (e) => {
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
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        const requiredColumns = [
          "N°",
          "Ets",
          "Parcours",
          "Nb. insc.",
          "Carte",
          "Nom",
          "Prénoms",
          "Sexe",
          "Né le",
          "À",
          "Nationalité",
          "Tél",
          "Avant",
          "Courant",
          "Total",
          "%",
        ];

        const sheetColumns = Object.keys(jsonData[0] || {});
        const isValidStructure = requiredColumns.every((col) =>
          sheetColumns.includes(col)
        );

        if (!isValidStructure) {
          alert(
            "Le fichier Excel ne correspond pas à la structure attendue. Il doit contenir toutes les colonnes comme dans le modèle."
          );
          return;
        }

        const formattedData = jsonData
          .map((row) => {
            const {
              Carte: carte,
              Nom: nom,
              Prénoms: prenoms,
              Sexe: sexe,
              "Né le": dateNaissance,
              À: lieuNaissance,
              Nationalité: nationalite,
              Tél: telephone,
              Avant: avant,
              Courant: courant,
              Total: total,
              "%": pourcentage,
            } = row;

            if (
              !carte ||
              !nom ||
              !prenoms ||
              !dateNaissance ||
              !lieuNaissance ||
              !sexe
            ) {
              alert(
                `Ligne incomplète détectée : ${JSON.stringify(row)}. Ignorée.`
              );
              return null;
            }

            if (!["M", "F"].includes(sexe.toUpperCase())) {
              alert(
                `Sexe invalide (${sexe}) pour l'étudiant : ${nom} ${prenoms}.`
              );
              return null;
            }

            return {
              carte: carte.toString(),
              nom,
              prenoms,
              sexe: sexe.toUpperCase(),
              dateNaissance,
              lieuNaissance,
              nationalite,
              telephone,
              avant: parseInt(avant) || 0,
              courant: parseInt(courant) || 0,
              total: parseInt(total) || 0,
              pourcentage: pourcentage?.toString() ?? "0,00",
            };
          })
          .filter((etudiant) => etudiant !== null);

        console.log("etudiants : ", formattedData[0]);

        const blob = new Blob([JSON.stringify(formattedData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "etudiants_importes.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        alert("Erreur de lecture du fichier Excel.");
      }
    };

    reader.onerror = () => {
      alert("Erreur lors de l'ouverture du fichier.");
    };

    reader.readAsBinaryString(file);
  };

  // fonction pour exporter les donnees en fichier excel
  // const exportEtudiantsToExcel = (etudiants) => {
  //   // Adapter les clés pour correspondre aux noms de colonnes attendus dans le fichier Excel
  //   const formattedData = etudiants.map((etudiant) => ({
  //     Carte: etudiant.carte,
  //     Nom: etudiant.nom,
  //     Prénoms: etudiant.prenoms,
  //     "Né le": etudiant.dateNaissance,
  //     À: etudiant.lieuNaissance,
  //     Sexe: etudiant.sexe,
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(formattedData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Etudiants");

  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });

  //   const blob = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });

  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);

  //   const now = new Date();
  //   const timestamp = now
  //     .toISOString()
  //     .slice(0, 16)
  //     .replace("T", "_")
  //     .replace(":", "-");
  //   link.download = `etudiants_${timestamp}.xlsx`;

  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
  const exportEtudiantsToExcel = (etudiants) => {
    if (!Array.isArray(etudiants) || etudiants.length === 0) {
      alert("Aucune donnée à exporter.");
      return;
    }

    const headers = [
      "N°",
      "Ets",
      "Parcours",
      "Nb. insc.",
      "Carte",
      "Nom",
      "Prénoms",
      "Sexe",
      "Né le",
      "À",
      "Nationalité",
      "Tél",
      "Avant",
      "Courant",
      "Total",
      "%",
    ];

    const worksheetData = [headers];

    etudiants.forEach((etudiant, index) => {
      const {
        carte,
        nom,
        prenoms,
        sexe,
        dateNaissance,
        lieuNaissance,
        nationalite,
        telephone,
        avant,
        courant,
        total,
        pourcentage,
      } = etudiant;

      worksheetData.push([
        index + 1,
        "FDD",
        "SUP - Capacité Droit 1",
        1,
        carte ?? "",
        nom ?? "",
        prenoms ?? "",
        sexe ?? "",
        dateNaissance ?? "",
        lieuNaissance ?? "",
        nationalite ?? "",
        telephone ?? "",
        avant ?? 0,
        courant ?? 0,
        total ?? 0,
        pourcentage ?? "0,00",
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Etudiants");

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
    link.download = `etudiants_${timestamp}.xlsx`;

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
    return (
      <div className="flex-grow">
        <div className="flex flex-col">
          <div className="bg-white flex items-center z-4 pt-3 pb-3  pr-4 justify-between">
            <h1 className="text-2xl font-bold">Liste des Étudiants</h1>

            <div className="flex items-center gap-4">
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
              <div>
                <select
                  value={typeAnneEtude}
                  onChange={(e) => setypeAnneEtude(e.target.value)}
                  className="p-2 border-none rounded-md shadow-sm text-sm"
                >
                  <option value="admis">1ere année</option>
                  <option value="echoues">2e année</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto mt-8">
            <table className="w-full border-collapse">
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
                    SEXE
                  </th>
                  <th className="px-4 py-2 text-gray-700 text-sm text-center">
                    ACTIONS
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
                          {etudiant.dateNaissance}{" "}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {" "}
                          {etudiant.lieuNaissance}{" "}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {etudiant.sexe}
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
              onClick={() => generatePDF(formattedData, "Liste des Étudiants")}
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
                onChange={handleImportExcelToJson}
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
