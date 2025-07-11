import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import InscriptionService from "@/services/InscriptionService";
import showNotification from "./showMessage";

// --------------------------------- ETUDIANTS --------------------------------
// fonction pour imprimer un fichier pdf |== ETUDIANTS
export const generatePDF = (etudiants, titre = "Liste des Étudiants") => {
  if (!etudiants?.length) {
    console.log("Aucun étudiant à imprimer !", "warning");
    return;
  }

  const doc = new jsPDF({ orientation: "landscape" }); // Mode paysage pour plus d'espace

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(titre, 148, 15, { align: "center" });

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
  ];

  // Données formatées
  const data = etudiants.map((etudiant) => [
    etudiant["N°"] || "1",
    etudiant["Ets"] || "FDD",
    etudiant["Parcours"] || "Capacité Droit 1",
    etudiant["Nb. insc."] || "1",
    etudiant["numero_carte"] || "",
    etudiant["nom"] || "",
    etudiant["prenom"] || "",
    etudiant["sexe"] || "",
    etudiant["date_naissance"] || "",
    etudiant["lieu_naissance"] || "",
    etudiant["Nationalite"] || "",
    etudiant["Tel_1"] || "",
  ]);

  // Générer le tableau (largeur ajustée en paysage)
  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 25,
    margin: { left: 10, right: 10 },
    styles: {
      fontSize: 8,
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
    },
  });

  // Télécharger
  doc.save(`${titre}.pdf`);
};

// fonction pour importer un fichier excel |== ETUDIANTS
export const importEtudiantToExcel = (e) => {
  return new Promise((resolve, reject) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("Veuillez sélectionner un fichier Excel.", "error");
      reject("Aucun fichier sélectionné");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      let formattedData = [];

      try {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });

        const requiredColumns = [
          "N°", "Ets", "Parcours", "Nb. insc.", "Carte", "Nom", "Prénoms", "Sexe",
          "Né le", "À", "Nationalité", "Tél"
        ];

        const sheetColumns = Object.keys(jsonData[0] || {});
        const isValidStructure = requiredColumns.every((col) =>
          sheetColumns.includes(col)
        );

        if (!isValidStructure) {
          console.log("Le fichier Excel ne correspond pas à la structure attendue.", "error");
          reject("Colonnes invalides");
          return;
        }

        formattedData = jsonData
          .map((row) => {
            const {
              Carte: numero_carte,
              Nom: nom,
              Prénoms: prenom,
              Sexe: sexe,
              "Né le": date_naissance,
              "À": lieu_naissance,
              Nationalité: Nationalite,
              Tél: Tel_1,
              Ets: etab,
              Parcours: parcours
            } = row;

            if (!numero_carte || !nom || !prenom || !date_naissance || !lieu_naissance || !sexe) {
              console.log(`Ligne incomplète détectée : ${JSON.stringify(row)}. Ignorée.`, 'error');
              return null;
            }

            if (!["M", "F"].includes(sexe.toUpperCase())) {
              console.log(`Sexe invalide (${sexe}) pour l'étudiant : ${nom} ${prenom}.`, 'error');
              return null;
            }

            return {
              numero_carte,
              nom,
              prenom,
              sexe: sexe.toUpperCase(),
              date_naissance,
              lieu_naissance,
              Nationalite,
              Tel_1,
              parcours,
              etab
            };
          })
          .filter((etudiant) => etudiant !== null);


        resolve(formattedData);
        console.log("formattedData: ", formattedData);
      } catch (error) {
        console.log("Erreur de lecture du fichier Excel.", "error");
        reject(error);
      }
    };

    reader.onerror = () => {
      console.log("Erreur lors de l'ouverture du fichier.", "error");
      reject("Erreur fichier");
    };

    reader.readAsBinaryString(file);
  });
};


// fonction pour exporter les donnees en fichier excel |== ETUDIANTS
export const exportEtudiantsToExcel = (etudiants) => {
  if (!Array.isArray(etudiants) || etudiants.length === 0) {
    console.log("Aucune donnée à exporter.", "error");
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
  ];

  const worksheetData = [headers];

  etudiants.forEach((etudiant, index) => {
    const {
      numero_carte,
      nom,
      prenom,
      sexe,
      date_naissance,
      lieu_naissance,
      Nationalite,
      Tel_1,
    } = etudiant;

    worksheetData.push([
      index + 1,
      "FDD",
      "SUP - Capacité Droit 1",
      1,
      numero_carte ?? "",
      nom ?? "",
      prenom ?? "",
      sexe ?? "",
      date_naissance ?? "",
      lieu_naissance ?? "",
      Nationalite ?? "",
      Tel_1 ?? "",
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

// ---------------------------------- MATIERES ----------------------------------

// fonction pour exporter les donnees en fichier excel |== MATIERES
export const exportMatieresToExcel = (matieres) => {
  if (!Array.isArray(matieres) || matieres.length === 0) {
    console.log("Aucune matière à exporter.", "error");
    return;
  }

  const headers = [
    "N°",
    "Libellé",
    "Abréviation",
    "Optionnelle",
    "Coefficient",
  ];

  const worksheetData = [headers];

  matieres.forEach((matiere, index) => {
    const { libelle, abreviation, optionnelle, coefficient } = matiere;

    worksheetData.push([
      index + 1,
      libelle ?? "",
      abreviation ?? "",
      optionnelle ? "Oui" : "Non", // Affichage plus lisible
      coefficient ?? 0,
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
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

// fonction pour importer et traiter le fichier excel |== MATIERES
export const importMatiereToExcel = (e) => {
  const file = e.target.files[0];
  if (!file) {
    console.log("Veuillez sélectionner un fichier Excel.", "error");
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
      const requiredColumns = ["libelle", "abreviation", "optionnelle"];
      const sheetColumns = Object.keys(jsonData[0] || {});

      // Vérifier si toutes les colonnes nécessaires existent dans le fichier
      const isValidStructure = requiredColumns.every((col) =>
        sheetColumns.includes(col)
      );
      if (!isValidStructure) {
        console.log(
          "Le fichier Excel ne correspond pas à la structure attendue. Assurez-vous qu'il contient les colonnes 'libelle', 'abreviation' et 'optionnelle'.", "error"
        );
        return;
      }

      // Valider et formater les données
      const formattedData = jsonData
        .map((row) => {
          if (!row.libelle || !row.abreviation || !row.optionnelle) {
            console.log("Certaines données sont manquantes dans le fichier Excel.", "error");
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
      console.log(
        "Erreur de lecture du fichier Excel. Assurez-vous qu'il soit valide.", "error"
      );
    }
  };
  reader.onerror = () => {
    console.log("Erreur lors de l'ouverture du fichier.", "error");
  };
  reader.readAsBinaryString(file);
};

//fonction pour imprimer un fichier pdf |== MATIERES
export const exportMatieresToPDF = (matieres, titre = "Liste des Matières") => {
  if (!Array.isArray(matieres) || matieres.length === 0) {
    console.log("Aucune matière à imprimer !", "error");
    return;
  }

  const doc = new jsPDF({ orientation: "landscape" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(titre, 148, 15, { align: "center" });

  // En-têtes du tableau
  const headers = [
    "N°",
    "Libellé",
    "Abréviation",
    "Optionnelle",
    "Coefficient",
  ];

  // Données formatées avec index
  const data = matieres.map((matiere, index) => [
    index + 1,
    matiere.libelle ?? "",
    matiere.abreviation ?? "",
    matiere.optionnelle ? "Oui" : "Non",
    matiere.coefficient ?? 0,
  ]);

  // Génération du tableau
  autoTable(doc, {
    head: [headers],
    body: data,
    startY: 25,
    tableWidth: "auto",
    styles: {
      fontSize: 10,
      cellPadding: 3,
      overflow: "linebreak",
      halign: "center", // Centre les cellules
    },
    headStyles: {
      fillColor: "#2c3e50",
      textColor: "#ffffff",
      halign: "center",
    },
  });

  doc.save(`${titre}.pdf`);
};

export const getParcoursAnneeEtudeId = async (parcours) => {
    const parcoursLibelle = parcours.replace("SUP - ", "");
    try {
      const res = await InscriptionService.getParcoursIdBylibelle(parcoursLibelle);
      return res; // Exemple : { id: 28 }
    } catch (err) {
      console.error("Erreur lors de la récupération du parcours pour :", parcoursLibelle);
      return { id: 0 };
    }
  };
  
  export const buildInscriptionsList = async (etudiantsData, anneeUnivId) => {
    // On récupère tous les IDs de parcours en parallèle
    const parcoursIds = await Promise.all(
      etudiantsData.map((e) => getParcoursAnneeEtudeId(e.parcours))
    ); 

    // On construit la liste des inscriptions avec les bons IDs
    const inscriptionsList = etudiantsData.map((e, index) => ({
      fk_annee_univ: parseInt(anneeUnivId),
      fk_etudiant: parseInt(e.numero_carte.replace(',', '')),
      fk_parcours_annee_etude: parcoursIds[index]?.id ?? 0, // au cas où l’id serait null
    }));

    console.log("inscriptionsList:", inscriptionsList);
    return inscriptionsList;
  };

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}