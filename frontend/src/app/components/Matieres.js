import { useState } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import * as XLSX from "xlsx";
/**
 * This page provides the list of matieres and allow all crud operations on this list
 */

const Matieres = () => {
  const [matieres, setMatieres] = useState([
    {
      numero: "MAT101",
      libelle: "Mathématiques",
      abbreviation: "MATH",
      optionnelle: "Non",
    },
    {
      numero: "PHY201",
      libelle: "Physique",
      abbreviation: "PHYS",
      optionnelle: "Oui",
    },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});
  const [libelle, setLibelle] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [optionnelle, setOptionnelle] = useState("Non");

  const handleEditClick = (index, matiere) => {
    setEditIndex(index);
    setEditData({ ...matiere });
  };

  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const handleSave = (index) => {
    const updatedMatieres = [...matieres];
    updatedMatieres[index] = editData;
    setMatieres(updatedMatieres);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette matière ?")) {
      setMatieres(matieres.filter((_, i) => i !== index));
    }
  };

  const handleAdd = () => {
    const newMatiere = {
      numero: `MAT${matieres.length + 1}01`,
      libelle,
      abbreviation,
      optionnelle,
    };
    setMatieres([...matieres, newMatiere]);
    setLibelle("");
    setAbbreviation("");
    setOptionnelle("Non");
  };

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
              abbreviation: row.abreviation,
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

  // Return the content of the page
  return (
    <div className=" ml-64 mt-15 ">
      <div className="p-6 bg-transparent w-full flex mt-4 gap-6">
        {/* Tableau des matières */}
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-md w-2/3">
          <h2 className="text-lg font-bold text-center m-2">
            Liste des matières
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  NUMERO
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  LIBELLE
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  ABRÉVIATION
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  OPTIONNELLE
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {matieres.map((matiere, index) => (
                <tr
                  key={matiere.numero}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  {editIndex === index ? (
                    <>
                      <td className="px-4 py-2 text-center">
                        {matiere.numero}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="text"
                          className="w-full p-1 border rounded"
                          value={editData.libelle}
                          onChange={(e) => handleInputChange(e, "libelle")}
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          type="text"
                          className="w-full p-1 border rounded"
                          value={editData.abbreviation}
                          onChange={(e) => handleInputChange(e, "abbreviation")}
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <select
                          className="w-full p-1 border rounded"
                          value={editData.optionnelle}
                          onChange={(e) => handleInputChange(e, "optionnelle")}
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
                      <td className="px-4 py-2 text-center">
                        {matiere.numero}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {matiere.libelle}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {matiere.abbreviation}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {matiere.optionnelle}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => handleEditClick(index, matiere)}
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
        {/* FORMULAIRE D'AJOUT */}
        <div className="bg-white shadow-md rounded-lg p-6 w-1/3 h-1/3">
          <h2 className="text-lg font-bold mb-4">Créer une matière</h2>
          <label className="block mb-2 text-sm font-semibold">Libellé</label>
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
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
          />
          <label className="block mb-2 text-sm font-semibold">
            Optionnelle
          </label>
          <select
            className="w-full p-1 border rounded mb-3"
            value={optionnelle}
            onChange={(e) => setOptionnelle(e.target.value)}
          >
            <option value="Oui">Oui</option>
            <option value="Non">Non</option>
          </select>
          <button
            className="w-full bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600"
            onClick={handleAdd}
          >
            Ajouter
          </button>
        </div>
      </div>
      {/* Boutons d'action */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
          Imprimer la liste
        </button>

        <label className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
          Importer fichier Excel
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImportExcel}
            className="hidden"
          />
        </label>

        <button
          onClick={() => exportMatieresToExcel(matieres)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 cursor-pointer"
        >
          Exporter au format excel
        </button>
      </div>
    </div>
  );
};
export default Matieres;
