import MatiereService from "@/services/MatiereService";
import { useEffect, useState } from "react";
import { getGrades } from "../utils/parseAnnee";
import AnneesEtudeService from "@/services/AnneesEtudeService";
import FiliereService from "@/services/FiliereService";

const Matieres = () => {
  const [matieres, setMatieres] = useState([]);
  const [typeFiliere, setTypeFiliere] = useState("Genie Logiciel");
  const [typeParcours, setTypeParcours] = useState("Licence");
  const [typeAnneEtude, setypeAnneEtude] = useState("1ere annee");
  const [anneesEtude, setAnneesEtude] = useState([]);
  const [filiere, setFiliere] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [codeSelected, setCodeSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEtudiants, setShowEtudiants] = useState(false);

  // Recuperation des matières
  useEffect(() => {
    MatiereService.getAllMatiere()
      .then((response) => {
        setMatieres(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  }, []);
  const fetchEtudiantsForMatiere = (idMatiere) => {
    setIsLoading(true);
    EtudiantService.getAllEtudiantsBySubject(idMatiere)
      .then((response) => {
        setEtudiants(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  };

  //Recuperation des années d'étude et des filières
  useEffect(() => {
    const anneeData = localStorage.getItem("anneesEtude");
    const filiereData = localStorage.getItem("filieres");

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

  const handleRowClick = (index, codeMat) => {
    setSelectedIndex(index);
    setCodeSelected(codeMat);
  };

  const handleValidation = () => {
    const selectedMatiere = matieres[selectedIndex];
    const id = selectedMatiere ? selectedMatiere.id : null;
    if (id) {
      setShowEtudiants(true);
      fetchEtudiantsForMatiere(id);
    }
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex items-center gap-4 ">
          <h2 className="text-lg font-bold ml-5  mt-5">Liste des matières</h2>
          <div className="flex items-center gap-4 ml-70">
            <select
              value={typeParcours}
              onChange={(e) => setTypeParcours(e.target.value)}
              className="p-2 border-none rounded-md shadow-sm text-sm"
            >
              <option value="admis">Licence</option>
              <option value="echoues">Master</option>
            </select>
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

        <div className="overflow-auto rounded-lg shadow-md mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-sm text-center">NUMERO</th>
                <th className="px-4 py-2 text-sm text-center">LIBELLE</th>
                <th className="px-4 py-2 text-sm text-center">ABRÉVIATION</th>
                <th className="px-4 py-2 text-sm text-center">OPTIONNELLE</th>
                <th className="px-4 py-2 text-sm text-center">COEFFICIENT</th>
              </tr>
            </thead>
            <tbody>
              {matieres.map((matiere, index) => (
                <tr
                  key={matiere.id}
                  className={`cursor-pointer ${
                    selectedIndex === index
                      ? "bg-blue-300"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handleRowClick(index, matiere.id)}
                >
                  <td className="px-4 py-2 text-center">MAT{matiere.id}</td>
                  <td className="px-4 py-2 text-center">{matiere.libelle}</td>
                  <td className="px-4 py-2 text-center">
                    {matiere.abreviation}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {matiere.optionnelle === 1 ? "Oui" : "Non"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {matiere.coefficient}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        className={`px-4 py-2 w-70 h-15 text-white font-bold rounded self-center ${
          selectedIndex === null
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-700"
        }`}
        onClick={handleValidation}
        disabled={selectedIndex === null}
      >
        Valider
      </button>
    </div>
  );
};
export default Matieres;
