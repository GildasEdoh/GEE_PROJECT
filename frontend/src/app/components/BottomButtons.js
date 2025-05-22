
import * as XLSX from "xlsx";

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
        const jsonData = XLSX.utils.sheet_to_json(sheet);

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
            "Le fichier Excel ne correspond pas à la structure attendue. Il doit contenir : numero_carte, nom, prenom, dateNaissance, lieuNaissance, sexe."
          );
          return;
        }

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
                `Ligne incomplète détectée : ${JSON.stringify(row)}. Ignorée.`
              );
              return null;
            }

            if (!["M", "F"].includes(sexe.toUpperCase())) {
              alert(
                `Sexe invalide (${sexe}) pour l'étudiant : ${nom} ${prenom}.`
              );
              return null;
            }

            return {
              carte: numero_carte.toString(),
              nom,
              prenoms: prenom,
              dateNaissance,
              lieuNaissance,
              sexe: sexe.toUpperCase(),
            };
          })
          .filter((etudiant) => etudiant !== null);

        console.log("etudiants : " + formattedData[0]);
        // Générer un fichier JSON
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
  const exportEtudiantsToExcel = (etudiants) => {
    const worksheet = XLSX.utils.json_to_sheet(etudiants);
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

  export {exportEtudiantsToExcel, handleImportEtudiantsExcel, handleImportExcelToJson};