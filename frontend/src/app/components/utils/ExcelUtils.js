import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --------------------------------- ETUDIANTS --------------------------------

// fonction pour imprimer un fichier pdf |== ETUDIANTS
export const generatePDF = (etudiants, titre = "Liste des Étudiants") => {
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
    "Credits Avant",
    "Credits Courant",
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
    etudiant["Credits Avant"] || "",
    etudiant["Credits Courant"] || "",
    etudiant["Total"] || "",
    etudiant["%"] || "",
  ]);

  // Générer le tableau (largeur ajustée en paysage)
  autoTable(doc, {
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

// fonction pour importer un fichier excel |== ETUDIANTS
export const importEtudiantToExcel = (e) => {
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

// fonction pour exporter les donnees en fichier excel |== ETUDIANTS
export const exportEtudiantsToExcel = (etudiants) => {
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

// ---------------------------------- MATIERES ----------------------------------

// fonction pour exporter les donnees en fichier excel |== MATIERES
export const exportMatieresToExcel = (matieres) => {
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

// fonction pour importer et traiter le fichier excel |== MATIERES
export const importMatiereToExcel = (e) => {
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
      const requiredColumns = ["libelle", "abreviation", "optionnelle"];
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

//fonction pour imprimer un fichier pdf |== MATIERES
export const exportMatieresToPDF = (matieres, titre = "Liste des Matieres") => {
  const doc = new jsPDF({ orientation: "landscape" });

  doc.setFontSize(16);
  doc.text(titre, 148, 15, { align: "center" });

  // Définir les en-têtes
  const headers = [["CODE", "LIBELLE", "ABRÉVIATION", "OPTIONNELLE"]];

  // Mapper les données
  const data = matieres.map((matiere) => [
    matiere.code,
    matiere.libelle,
    matiere.abreviation,
    matiere.optionnelle ? "Oui" : "Non",
  ]);

  // Générer le tableau
  autoTable(doc, {
    startY: 20,
    head: headers,
    body: data,
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: 255,
      halign: "center",
    },
  });

  // Sauvegarder le fichier
  doc.save("matieres.pdf");
};

// fonction pour importer le fichier excel en .json
// export const importExcelAndSaveAsJSON = (event) => {
//   const file = event.target.files[0];

//   if (!file) {
//     alert("Veuillez sélectionner un fichier Excel.");
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = (e) => {
//     const data = e.target.result;
//     const workbook = XLSX.read(data, { type: "binary" });
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

//     // Validation des colonnes attendues
//     const expectedHeaders = ["libelle", "abreviation", "optionnelle"];
//     const headersMatch = expectedHeaders.every(
//       (header) => header in jsonData[0]
//     );

//     if (!headersMatch) {
//       alert(
//         "Le format du fichier est invalide. Veuillez respecter les colonnes : libelle, abreviation, optionnelle."
//       );
//       return;
//     }

//     const formattedData = jsonData.map((item, index) => ({
//       id: Date.now() + index,
//       libelle: item.libelle,
//       abreviation: item.abreviation,
//       optionnelle: item.optionnelle === 1 || item.optionnelle === "1" ? 1 : 0,
//     }));

//     // Création du fichier JSON
//     const blob = new Blob([JSON.stringify(formattedData, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);

//     // Création d'un lien pour forcer le téléchargement
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "matieres_importees.json";
//     a.click();

//     // Libère l’URL une fois le fichier téléchargé
//     URL.revokeObjectURL(url);
//   };

//   reader.readAsBinaryString(file);
// };
