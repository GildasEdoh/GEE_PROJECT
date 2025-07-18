import { useEffect, useState } from "react";
import EtudiantService from "@/services/EtudiantService";
import MatiereService from "@/services/MatiereService";
import NoteService from "@/services/NoteService";
import AnneesEtudeService from "@/services/AnneesEtudeService";
import FiliereService from "@/services/FiliereService";
import { getGrades, getSessionIndex, getAnneeEtudeIndex, getAnneeUnivIndex, getFiliereLibelle } from "../utils/parseAnnee";

import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";

const MajNotes = () => {
  const [matieres, setMatieres] = useState([]);
  const [codeSelected, setCodeSelected] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [etudiants, setEtudiants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [showEtudiants, setShowEtudiants] = useState(false);
  const [evaluation, setEvaluation] = useState("Devoir");
  const [typeFiliere, setTypeFiliere] = useState("3");
  const [typeParcours, setTypeParcours] = useState("CAPACITE");
  const [typeAnneEtude, setypeAnneEtude] = useState("1");
  const [anneesEtude, setAnneesEtude] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [defaultEtudiant, setDefaultEtudiants] = useState([]);
  var parcoursLibelle = "";

  var grades = [];
  var anneeUnivCouranteId = 1;
  var filiereCouranteId = 3;
  var sessionCouranteId = 1
  var anneeCurId = 6
  var etabCourantId = 1

  // Recuperation des matières
  useEffect(() => {
    updateEtudiant();
    MatiereService.getMatiereByFiltre(etabCourantId, filiereCouranteId, anneeCurId, anneeUnivCouranteId, sessionCouranteId)
      .then((response) => {
        setMatieres(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
  }, [typeParcours, typeAnneEtude, typeFiliere]);

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

  const fetchEtudiantsForMatiere = (idMatiere) => {
    // setIsLoading(true);
    let isEmpty = false;
    EtudiantService.getAllEtudiantsBySubject(idMatiere)
      .then((response) => {
        if (response.length == 0) {
          console.log("response.length == 0")
          isEmpty = true;
        } else {
          setIsLoading(false);
          setEtudiants(response);
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setIsLoading(false);
        setError(true);
      });
      if (isEmpty) {
        console.log("emptyyyyyyy");
        getDefaultEtudiant();
      }
  };
    const getDefaultEtudiant = () => {
    // Get the list of students
      console.log("anneeUnivCouranteId = " + anneeUnivCouranteId +
        ", sessionCouranteId = " + sessionCouranteId +
        ", anneeEtudeCourante = " + typeAnneEtude +
        ", filireCouranteId = " + filiereCouranteId +
        ", anneeCurId = " + anneeCurId);
  
      EtudiantService.getEtudiantByFiltre(etabCourantId, filiereCouranteId, anneeCurId, anneeUnivCouranteId, sessionCouranteId)
        .then((response) => {
          // console.log("🚀 Reponse brute de l'API :", response[0]);
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

  const handleEdit = (index) => {
    const etudiant = etudiants[index];
    const id = etudiant.numero_carte;

    // Tu as maintenant l'ID de l'étudiant !
    console.log("ID de l'étudiant :", id);

    setEditIndex(index);
  setEditedData({
    note_devoir: etudiant.note_devoir ?? "",
    note_examen: etudiant.note_examen ?? "",
    total_pondere: etudiant.total_pondere ?? "",
  });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedData({});
  };

  const handleSave = async (index) => {
    try {
      const updatedEtudiants = [...etudiants];
      const etudiant = etudiants[index]; // donc ici encore tu as l'ID
      const id = etudiant.numero_carte;

      const devoir = parseFloat(editedData.note_devoir);
      const examen = parseFloat(editedData.note_examen);
      const moyenne = parseFloat(editedData.total_pondere);

      // Validation des champs requis
      if (evaluation === "Devoir") {
        if (isNaN(devoir) || devoir < 0 || devoir > 20) {
          alert("Veuillez entrer une note de devoir valide entre 0 et 20.");
          setdevoir("");
          return;
        }

        updatedEtudiants[index] = { ...etudiant, note_devoir: devoir };
      } else if (evaluation === "Examen") {
        if (
          isNaN(devoir) ||
          devoir < 0 ||
          devoir > 20 ||
          isNaN(examen) ||
          examen < 0 ||
          examen > 20 ||
          isNaN(moyenne) ||
          moyenne < 0 ||
          moyenne > 20
        ) {
          alert(
            "Toutes les notes doivent être des nombres valides entre 0 et 20."
          );
          return;
        }

        updatedEtudiants[index] = {
          ...etudiant,
          note_devoir: devoir,
          note_examen: examen,
          total_pondere: moyenne,
        };
      }

      setEtudiants(updatedEtudiants);
      setEditIndex(null);
      setEditedData({});
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la note :", error);
      alert("Une erreur s'est produite.");
    }
  };

  const updateEtudiant = () => {
    // Reconstitution du parcours
    const anneeUniv = JSON.parse(localStorage.getItem("anneeUnivCourante"))
    const sessionCourante = JSON.parse(localStorage.getItem("sessionCourante"))

    const anneesUniv = JSON.parse(localStorage.getItem("annees"));
    const sessions = JSON.parse(localStorage.getItem("sessions"));
    const anneesEtudes = JSON.parse(localStorage.getItem("anneesEtude"));

    const anneeCur = typeParcours + " " + typeAnneEtude;

    if (anneeUniv && sessionCourante && anneesUniv && sessions && anneesEtudes) {
          anneeUnivCouranteId = getAnneeUnivIndex(anneeUniv, anneesUniv);
          filiereCouranteId = parseInt(typeFiliere);
          console.log("error --- fi --", filiereCouranteId);
          sessionCouranteId = getSessionIndex(sessionCourante, sessions);
          anneeCurId = getAnneeEtudeIndex(anneeCur, anneesEtudes);
          parcoursLibelle = getFiliereLibelle(typeFiliere, filieres);
    }
    setIsLoading(true);
    getDefaultEtudiant();
  }

  const afficheEtudiants = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
        </div>
      );
    } else if (error) {
      return (
        <div className="ml-64 mt-20 w-2/3">
          <div className="bg-red-100 text-red-700 h-50 rounded shadow-md text-center text-3xl">
            ⚠️ Impossible de récupérer la liste. Erreur serveur
          </div>
        </div>
      );
    } 
    else if (etudiants.length === 0 ) {
      return (
        <div className="ml-60 mt-20 w-2/3 h-2/3">
          <div className="bg-yellow-100 text-yellow-700 h-50 rounded shadow-md text-center text-3xl">
            Aucune donnée disponible pour cette matière.
          </div>
        </div>
      );
    } else {
      return (
        <div className="ml-5 mt-0 w-full">
          <div className="flex items-center gap-4 ml-10">
            <span className="text-black font-bold text-sm">
                Matiere:
            </span>
            <select
                value={"etudiants[0].matiere"}
                onChange={(e) => console.log("hello")}
                className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white ml-1"
              >
                <option>{"etudiants[0].matiere"}</option>
              </select>
            
            <span className="text-black font-bold text-sm ml-3">
                Parcours: 
            </span>
            <select
              value={typeParcours}
              onChange={(e) => setTypeParcours(e.target.value)}
              className="p-2 border-none rounded-md shadow-sm text-sm"
            >
              <option value="admis"> {typeParcours} {parcoursLibelle} {JSON.parse(typeAnneEtude)}  </option>
            </select>

              <span className="text-black font-bold text-sm ml-3">
                Evaluation
              </span>
              <select
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white "
              >
                <option>Exam Harmattan </option>
                <option>Exam Mousson </option>
              </select>

            <div>
              <span className="text-black font-bold text-sm ml-5">
                Type d'evaluation: 
              </span>
              <select
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white ml-1"
              >
                <option>Devoir</option>
                <option>Examen</option>
              </select>
            </div>
          </div>

          {/* <div className="flex items-center space-x-10 ml-60 mt-7"></div> */}

          <div className="border p-4 mt-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-sm text-center">N° CARTE</th>
                  <th className="px-4 py-2 text-sm text-center">NOM</th>
                  <th className="px-4 py-2 text-sm text-center">PRÉNOMS</th>
                  <th className="px-4 py-2 text-sm text-center">SEXE</th>
                  {evaluation === "Devoir" && (
                    <th className="px-4 py-2 text-sm text-center">Devoir</th>
                  )}
                  {evaluation === "Examen" && (
                    <>
                      <th className="px-4 py-2 text-sm text-center">Devoir</th>
                      <th className="px-4 py-2 text-sm text-center">Examen</th>
                      <th className="px-4 py-2 text-sm text-center">Moyenne</th>
                    </>
                  )}
                  <th className="px-4 py-2 text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {etudiants.map((etudiant, index) => (
                  <tr
                    key={`${etudiant.numero_carte}-${index}`}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="px-4 py-2 text-center">
                      {etudiant.numero_carte}
                    </td>
                    <td className="px-4 py-2 text-center">{etudiant.nom}</td>
                    <td className="px-4 py-2 text-center">{etudiant.prenom}</td>
                    <td className="px-4 py-2 text-center">{etudiant.sexe}</td>
                    <td className="px-4 py-2 text-center">
                      {editIndex === index ? (
                        <input
                          id="devoir-input"
                          type="number"
                          value={editedData.note_devoir}
                          onChange={(e) => {
                            console.log("Valeur saisie :", e.target.value);
                            setEditedData({
                              ...editedData,
                              note_devoir: e.target.value,
                            });
                          }}
                          disabled={evaluation !== "Devoir"}
                          className="w-16 text-center border rounded bg-gray-100 disabled:opacity-50"
                        />
                      ) : (
                        etudiant.note_devoir
                      )}
                    </td>
                    {evaluation === "Examen" && (
                      <>
                        <td className="px-4 py-2 text-center">
                          {editIndex === index ? (
                            <input
                              id="examen-input"
                              type="number"
                              value={editedData.note_examen}
                              onChange={(e) =>
                                setEditedData({
                                  ...editedData,
                                  note_examen: e.target.value,
                                })
                              }
                              className="w-16 text-center border rounded bg-gray-100"
                            />
                          ) : (
                            etudiant.note_examen
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {editIndex === index ? ( 
                            
                            <input
                              type="number"
                              value={editedData.total_pondere}
                              onChange={(e) =>
                                setEditedData({
                                  ...editedData,
                                  total_pondere: e.target.value,
                                })
                              }
                              className="w-16 text-center border rounded bg-gray-100"
                            />
                          ) : (
                            etudiant.total_pondere
                          )}
                        </td>
                      </>
                    )}
                    <td className="px-4 py-2 text-center">
                      {editIndex === index ? (
                        <div className="flex justify-center gap-2">
                          <MdCheck
                            className="text-green-600 cursor-pointer"
                            onClick={() => handleSave(index)}
                          />
                          <MdClose
                            className="text-red-600 cursor-pointer"
                            onClick={handleCancel}
                          />
                        </div>
                      ) : (
                        <MdEdit
                          className="text-blue-500 cursor-pointer mx-auto"
                          onClick={() => handleEdit(index, etudiant)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
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

        <div className="flex flex-col rounded-sm w-full h-full shadow-sm">
          {!showEtudiants && (
            <>
            {anneesEtude.length != 0 ? (grades = getGrades(anneesEtude)) : []}
              <div className="w-full">
                <div className=" bg-white sticky top-0 z-2 flex items-center justify-between  mb-5 p-3">
                  <h2 className="md:text-lg lg:text-xl text-md font-bold text-center">
                    Liste des matières
                  </h2>

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
                        value={typeFiliere}
                        onChange={(e) => {
                          setTypeFiliere(e.target.value);
                          // console.log('----- filiere---  ', e.target.value);
                          localStorage.setItem("filiereCourante", JSON.stringify(e.target.value));
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
                          setypeAnneEtude(e.target.value)
                          // console.log('----- type annee---  ', e.target.value);
                          localStorage.setItem("anneeEtudeCourante", JSON.stringify(e.target.value));
                        }}
                        className="p-2 border-none rounded-md shadow-sm text-sm"
                      >
                        <option value="1">1ere année</option>
                        <option value="2">2eme année</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-auto rounded-lg shadow-md mt-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-sm text-center">
                          NUMERO
                        </th>
                        <th className="px-4 py-2 text-sm text-center">
                          LIBELLE
                        </th>
                        <th className="px-4 py-2 text-sm text-center">
                          ABRÉVIATION
                        </th>
                        <th className="px-4 py-2 text-sm text-center">
                          OPTIONNELLE
                        </th>
                        <th className="px-4 py-2 text-sm text-center">
                          COEFFICIENT
                        </th>
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
                          <td className="px-4 py-2 text-center">
                            MAT{matiere.id}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {matiere.libelle}
                          </td>
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
            </>
          )}
          {showEtudiants && afficheEtudiants()}
        </div>
      </div>
    );
  }
};

export default MajNotes;
