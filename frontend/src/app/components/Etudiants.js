import { useState } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import * as XLSX from "xlsx";
/**
 * Return the page which contains the table of students
 */
const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([
    {
      carte: "123456",
      nom: "Koffi",
      prenoms: "Jean",
      sexe: "M",
      moyenne: 12.5,
    },
    { carte: "654321", nom: "Doe", prenoms: "Alice", sexe: "F", moyenne: 14.0 },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleDeleteEtudiant = (index) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      setEtudiants(etudiants.filter((_, i) => i !== index));
    }
  };

  const handleEditEtudiant = (index) => {
    setEditIndex(index);
    setEditedData(etudiants[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedEtudiants = [...etudiants];
    updatedEtudiants[index] = editedData;
    setEtudiants(updatedEtudiants);
    setEditIndex(null);
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

  return (
    <div className="ml-64 mt-20">
      <h1 className="text-2xl font-bold text-center">Liste des Étudiants</h1>
      <div className="border p-4 mt-4">
        <table className="w-full text-left border-collapse">
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
                SEXE
              </th>
              <th className="px-4 py-2 text-gray-700 text-sm text-center">
                MOYENNE
              </th>
              <th className="px-4 py-2 text-gray-700 text-sm text-center">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {etudiants.map((etudiant, index) => (
              <tr
                key={etudiant.carte}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                {editIndex === index ? (
                  <>
                    <td className=" px-0 py-2 ">{etudiant.carte}</td>
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
                        value={editedData.prenoms}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            prenoms: e.target.value,
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
                    <td className="px-4 py-2 text-center">{etudiant.carte}</td>
                    <td className="px-4 py-2 text-center">{etudiant.nom}</td>
                    <td className="px-4 py-2 text-center">
                      {etudiant.prenoms}
                    </td>
                    <td className="px-4 py-2 text-center">{etudiant.sexe}</td>
                    <td className="px-4 py-2 text-center">
                      {etudiant.moyenne}
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
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
          Imprimer la liste
        </button>

        <label className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
          Importer fichier Excel
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImportExcelToJson}
            className="hidden"
          />
        </label>

        <button
          onClick={() => exportEtudiantsToExcel(etudiants)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer"
        >
          Exporter au format excel
        </button>
      </div>
    </div>
  );
};

export default Etudiants;
