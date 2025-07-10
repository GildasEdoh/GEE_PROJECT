import { useEffect, useState, useCallback } from "react";
import EtudiantService from "@/services/EtudiantService";
import MatiereService from "@/services/MatiereService";
import NoteService from "@/services/NoteService";
import AnneesEtudeService from "@/services/AnneesEtudeService";
import FiliereService from "@/services/FiliereService";
import {
  getGrades,
  getSessionIndex,
  getAnneeEtudeIndex,
  getAnneeUnivIndex,
  getFiliereLibelle,
} from "../utils/parseAnnee";

const MajNotes = () => {
  // States groupés par fonctionnalité
  const [data, setData] = useState({
    matieres: [],
    etudiants: [],
    anneesEtude: [],
    filieres: [],
  });

  const [ui, setUi] = useState({
    isLoading: true,
    error: false,
    showEtudiants: false,
    selectedIndex: null,
    editIndex: null,
    editedData: {},
  });

  const [filters, setFilters] = useState({
    codeSelected: "",
    evaluation: "Devoir",
    typeFiliere: "3",
    typeParcours: "CAPACITE",
    typeAnneEtude: "1",
    poidsDevoir: 0.5,
    poidsExamen: 0.5,
    poidsErreur: false,
    libelleMatSelected: ""
  });

  // Constantes déplacées dans le state ou calculées
  const constants = {
    anneeUnivCouranteId: 1,
    filiereCouranteId: 3,
    sessionCouranteId: 1,
    anneeCurId: 6,
    etabCourantId: 1,
  };
  // Utilitaires pour localStorage
  const getFromStorage = (key) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const setToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Fonction pour mettre à jour les IDs courants
  const updateCurrentIds = useCallback(() => {
    const anneeUniv = getFromStorage("anneeUnivCourante");
    const sessionCourante = getFromStorage("sessionCourante");
    const anneesUniv = getFromStorage("annees");
    const sessions = getFromStorage("sessions");
    const anneesEtudes = getFromStorage("anneesEtude");

    const anneeCur = `${filters.typeParcours} ${filters.typeAnneEtude}`;

    if (anneeUniv && sessionCourante && anneesUniv && sessions && anneesEtudes) {
      return {
        etabCourantId : 1,
        anneeUnivCouranteId: getAnneeUnivIndex(anneeUniv, anneesUniv),
        filiereCouranteId: parseInt(filters.typeFiliere),
        sessionCouranteId: getSessionIndex(sessionCourante, sessions),
        anneeCurId: getAnneeEtudeIndex(anneeCur, anneesEtudes),
      };
    }
    return constants;
  }, [filters.typeParcours, filters.typeAnneEtude, filters.typeFiliere]);

  // Chargement des données de référence
  const loadReferenceData = useCallback(async () => {
    try {
      const [anneesEtudeData, filieresData] = await Promise.all([
        getFromStorage("anneesEtude") || AnneesEtudeService.getAllAnneesEtude(),
        getFromStorage("filieres") || FiliereService.getAllFiliere(),
      ]);

      if (!getFromStorage("anneesEtude")) setToStorage("anneesEtude", anneesEtudeData);
      if (!getFromStorage("filieres")) setToStorage("filieres", filieresData);

      setData(prev => ({
        ...prev,
        anneesEtude: anneesEtudeData,
        filieres: filieresData,
      }));
    } catch (error) {
      console.error("Erreur lors du chargement des données de référence:", error);
      setUi(prev => ({ ...prev, error: true }));
    }
  }, []);

  // Chargement des matières
  const loadMatieres = useCallback(async () => {
    try {
      setUi(prev => ({ ...prev, isLoading: true }));
      const currentIds = updateCurrentIds();
      console.log(" ---- currentIds ---- ", currentIds)
      
      const response = await MatiereService.getMatiereByFiltre(
        currentIds.etabCourantId,
        currentIds.filiereCouranteId,
        currentIds.anneeCurId,
        currentIds.anneeUnivCouranteId,
        currentIds.sessionCouranteId
      );

      setData(prev => ({ ...prev, matieres: response }));
      setUi(prev => ({ ...prev, isLoading: false, error: false }));
    } catch (error) {
      console.error("Erreur lors du chargement des matières:", error);
      setUi(prev => ({ ...prev, isLoading: false, error: true }));
    }
  }, [filters.typeParcours, filters.typeAnneEtude, filters.typeFiliere, updateCurrentIds]);

  // Chargement des étudiants
  const loadEtudiants = useCallback(async (idMatiere = null) => {
    try {
      const currentIds = updateCurrentIds();
      let response;

      if (idMatiere) {
        response = await EtudiantService.getAllEtudiantsBySubject(idMatiere);
      }

      // Si pas d'étudiants ou pas d'ID matière, charger tous les étudiants
      if (!response || response.length === 0) {
        response = await EtudiantService.getEtudiantByFiltre(
          currentIds.etabCourantId,
          currentIds.filiereCouranteId,
          currentIds.anneeCurId,
          currentIds.anneeUnivCouranteId,
          currentIds.sessionCouranteId
        );
      }

      setData(prev => ({ ...prev, etudiants: response }));
      setUi(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error("Erreur lors du chargement des étudiants:", error);
      setUi(prev => ({ ...prev, isLoading: false, error: true }));
    }
  }, [updateCurrentIds]);

  // Calcul de la moyenne pour tous les étudiants
  const calculerMoyennePourTous = useCallback((poidsDev, poidsExam) => {
    const nouveauxEtudiants = data.etudiants.map(etudiant => ({
      ...etudiant,
      total_pondere: (
        parseFloat(etudiant.note_devoir || 0) * poidsDev +
        parseFloat(etudiant.note_examen || 0) * poidsExam
      ).toFixed(2),
    }));

    setData(prev => ({ ...prev, etudiants: nouveauxEtudiants }));
  }, [data.etudiants]);

  // Validation des notes
  const validateNote = (value, fieldName) => {
    const note = parseFloat(value);
    if (isNaN(note) || note < 0 || note > 20) {
      alert(`Veuillez entrer une note ${fieldName} valide entre 0 et 20.`);
      return false;
    }
    return true;
  };

  // Handlers
  const handleRowClick = (index, codeMat) => {
    setUi(prev => ({ ...prev, selectedIndex: index }));
    setFilters(prev => ({ ...prev, codeSelected: codeMat }));
  };

  const handleValidation = () => {
    const selectedMatiere = data.matieres[ui.selectedIndex];
    // filters.libelleMatSelected.setFilters(selectedMatiere?.libelle)
    setFilters(prevFilters => ({
      ...prevFilters,
      libelleMatSelected: selectedMatiere.libelle
    }));
    if (selectedMatiere?.id) {
      setUi(prev => ({ ...prev, showEtudiants: true }));
      loadEtudiants(selectedMatiere.id);
    }
  };

  const handleEdit = (index) => {
    const etudiant = data.etudiants[index];
    setUi(prev => ({
      ...prev,
      editIndex: index,
      editedData: {
        note_devoir: etudiant.note_devoir ?? "",
        note_examen: etudiant.note_examen ?? "",
        total_pondere: etudiant.total_pondere ?? "",
      },
    }));
  };

  const handleSave = async (index) => {
    try {
      const etudiant = data.etudiants[index];
      const { note_devoir, note_examen, total_pondere } = ui.editedData;

      // Validation selon le type d'évaluation
      if (filters.evaluation === "Devoir") {
        if (!validateNote(note_devoir, "de devoir")) return;
      } else if (filters.evaluation === "Examen") {
        if (!validateNote(note_devoir, "de devoir") || 
            !validateNote(note_examen, "d'examen") || 
            !validateNote(total_pondere, "moyenne")) return;
      }

      const updatedEtudiants = [...data.etudiants];
      updatedEtudiants[index] = {
        ...etudiant,
        ...(filters.evaluation === "Devoir" && { note_devoir: parseFloat(note_devoir) }),
        ...(filters.evaluation === "Examen" && {
          note_devoir: parseFloat(note_devoir),
          note_examen: parseFloat(note_examen),
          total_pondere: parseFloat(total_pondere),
        }),
      };

      setData(prev => ({ ...prev, etudiants: updatedEtudiants }));
      setUi(prev => ({ ...prev, editIndex: null, editedData: {} }));
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  };

  const handleKeyDown = async (e, currentIndex) => {
    if (e.key === "Enter") {
      await handleSave(currentIndex);
      const nextIndex = currentIndex + 1;
      if (nextIndex < data.etudiants.length) {
        handleEdit(nextIndex);
      }
    }
  };

  const handlePoidsChange = (type, value) => {
    const newValue = parseInt(value, 10) / 100;
    const otherValue = type === "devoir" ? filters.poidsExamen : filters.poidsDevoir;
    const sum = (type === "devoir" ? newValue + otherValue : filters.poidsDevoir + newValue).toFixed(2);

    setFilters(prev => ({
      ...prev,
      [type === "devoir" ? "poidsDevoir" : "poidsExamen"]: newValue,
      poidsErreur: sum !== "1.00",
    }));

    if (sum === "1.00") {
      const poidsDev = type === "devoir" ? newValue : filters.poidsDevoir;
      const poidsExam = type === "examen" ? newValue : filters.poidsExamen;
      calculerMoyennePourTous(poidsDev, poidsExam);
    } else {
      // alert("La somme des poids doit être égale à 100%. Veuillez ajuster les poids.");
    }
  };

  // Effects
  useEffect(() => {
    loadReferenceData();
  }, [loadReferenceData]);

  useEffect(() => {
    loadEtudiants();
    loadMatieres();
  }, [filters.typeParcours, filters.typeAnneEtude, filters.typeFiliere, loadMatieres, loadEtudiants]);

  // Render helpers
  const renderLoading = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );

  const renderError = (message) => (
    <div className="ml-64 mt-20 w-2/3">
      <div className="bg-red-100 text-red-700 h-50 rounded shadow-md text-center text-3xl">
        ⚠️ {message}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="ml-60 mt-20 w-2/3 h-2/3">
      <div className="bg-yellow-100 text-yellow-700 h-50 rounded shadow-md text-center text-3xl">
        Aucune donnée disponible pour cette matière.
      </div>
    </div>
  );

  const renderEtudiants = () => {
    if (ui.isLoading) return renderLoading();
    if (ui.error) return renderError("Impossible de récupérer la liste. Erreur serveur");
    if (data.etudiants.length === 0) return renderEmptyState();

    const parcoursLibelle = getFiliereLibelle(filters.typeFiliere, data.filieres);
    const grades = data.anneesEtude.length > 0 ? getGrades(data.anneesEtude) : [];

    return (
      <div className="ml-0 mt-0 w-full">
        <div className="flex items-center gap-4 ml-5 flex-wrap">
          <span className="text-black font-bold text-sm">Matiere</span>
          <select
            value={filters.libelleMatSelected}
            onChange={() => {}}
            className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white ml-1"
          >
            <option>{filters.libelleMatSelected}</option>
          </select>

          <span className="text-black font-bold text-sm ml-2">Parcours</span>
          <select
            value={filters.typeParcours}
            onChange={(e) => setFilters(prev => ({ ...prev, typeParcours: e.target.value }))}
            className="p-2 border-none rounded-md shadow-sm text-sm"
          >
            <option value="admis">
              {filters.typeParcours} {parcoursLibelle} {filters.typeAnneEtude}
            </option>
          </select>

          <span className="text-black font-bold text-sm ml-2">Evaluation</span>
          <select
            value={filters.evaluation}
            onChange={(e) => setFilters(prev => ({ ...prev, evaluation: e.target.value }))}
            className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white"
          >
            <option>Exam Harmattan</option>
            <option>Exam Mousson</option>
          </select>

          <div>
            <span className="text-black font-bold text-sm ml-0">Type d'evaluation</span>
            <select
              value={filters.evaluation}
              onChange={(e) => setFilters(prev => ({ ...prev, evaluation: e.target.value }))}
              className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white ml-1"
            >
              <option>Devoir</option>
              <option>Examen</option>
              <option>Moyenne</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-black font-bold text-sm ml-0">Poids devoir</span>
            <input
              type="number"
              min="0"
              max="100"
              step="10"
              value={filters.poidsDevoir * 100}
              onChange={(e) => handlePoidsChange("devoir", e.target.value)}
              className={`w-20 px-2 py-1/2 rounded border-none focus:outline-none text-sm text-white ml-1 text-center ${
                filters.poidsErreur ? "bg-red-500" : "bg-blue-500"
              }`}
              disabled={filters.evaluation !== "Moyenne"}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-black font-bold text-sm ml-0">Poids examen</span>
            <input
              type="number"
              min="0"
              max="100"
              step="10"
              value={filters.poidsExamen * 100}
              onChange={(e) => handlePoidsChange("examen", e.target.value)}
              className={`w-20 px-2 py-1/2 rounded border-none focus:outline-none text-sm text-white ml-1 text-center ${
                filters.poidsErreur ? "bg-red-500" : "bg-blue-500"
              }`}
              disabled={filters.evaluation !== "Moyenne" || filters.poidsDevoir === 1}
            />
          </div>
        </div>

        <div className="border p-4 mt-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-sm text-center">N° CARTE</th>
                <th className="px-4 py-2 text-sm text-center">NOM</th>
                <th className="px-4 py-2 text-sm text-center">PRÉNOMS</th>
                <th className="px-4 py-2 text-sm text-center">SEXE</th>
                {filters.evaluation === "Devoir" && (
                  <th className="px-4 py-2 text-sm text-center">Devoir</th>
                )}
                {filters.evaluation === "Examen" && (
                  <th className="px-4 py-2 text-sm text-center">Examen</th>
                )}
                {filters.evaluation === "Moyenne" && (
                  <th className="px-4 py-2 text-sm text-center">Moyenne</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.etudiants.map((etudiant, index) => (
                <tr
                  key={`${etudiant.numero_carte}-${index}`}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="px-4 py-2 text-center">{etudiant.numero_carte}</td>
                  <td className="px-4 py-2 text-center">{etudiant.nom}</td>
                  <td className="px-4 py-2 text-center">{etudiant.prenom}</td>
                  <td className="px-4 py-2 text-center">{etudiant.sexe}</td>
                  {filters.evaluation === "Devoir" && (
                    <td
                      className="px-4 py-2 text-center cursor-pointer"
                      onClick={() => handleEdit(index)}
                    >
                      {ui.editIndex === index ? (
                        <input
                          type="number"
                          value={ui.editedData.note_devoir}
                          onChange={(e) =>
                            setUi(prev => ({
                              ...prev,
                              editedData: { ...prev.editedData, note_devoir: e.target.value },
                            }))
                          }
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          autoFocus
                          className="w-16 text-center border rounded bg-gray-100"
                        />
                      ) : (
                        etudiant.note_devoir
                      )}
                    </td>
                  )}
                  {filters.evaluation === "Examen" && (
                    <td
                      className="px-4 py-2 text-center cursor-pointer"
                      onClick={() => handleEdit(index)}
                    >
                      {ui.editIndex === index ? (
                        <input
                          type="number"
                          value={ui.editedData.note_examen}
                          onChange={(e) =>
                            setUi(prev => ({
                              ...prev,
                              editedData: { ...prev.editedData, note_examen: e.target.value },
                            }))
                          }
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          autoFocus
                          className="w-16 text-center border rounded bg-gray-100"
                        />
                      ) : (
                        etudiant.note_examen
                      )}
                    </td>
                  )}
                  {filters.evaluation === "Moyenne" && (
                    <td className="px-4 py-2 text-center">{etudiant.total_pondere}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (ui.isLoading && !ui.showEtudiants) return renderLoading();
  if (ui.error && !ui.showEtudiants) return renderError("Impossible de récupérer la liste. Erreur serveur");

  const grades = data.anneesEtude.length > 0 ? getGrades(data.anneesEtude) : [];

  return (
    <div className="flex-grow">
      <div className="flex flex-col rounded-sm w-full h-full shadow-sm">
        {!ui.showEtudiants && (
          <>
            <div className="w-full">
              <div className="bg-white sticky top-0 z-2 flex items-center justify-between mb-5 p-3">
                <h2 className="md:text-lg lg:text-xl text-md font-bold text-center">
                  Liste des matières
                </h2>

                <div className="flex items-center gap-4">
                  <select
                    value={filters.typeParcours}
                    onChange={(e) => setFilters(prev => ({ ...prev, typeParcours: e.target.value }))}
                    className="p-2 border-none rounded-md shadow-sm text-sm"
                  >
                    {grades.length === 0 ? (
                      <option value="--">-----------</option>
                    ) : (
                      grades.map((g, index) => (
                        <option key={index} value={g}>{g}</option>
                      ))
                    )}
                  </select>

                  <select
                    value={filters.typeFiliere}
                    onChange={(e) => {
                      setFilters(prev => ({ ...prev, typeFiliere: e.target.value }));
                      setToStorage("filiereCourante", e.target.value);
                    }}
                    className="p-2 border-none rounded-md shadow-sm text-sm"
                  >
                    {data.filieres.length === 0 ? (
                      <option value="--">------------</option>
                    ) : (
                      data.filieres.map((f) => (
                        <option key={f.id} value={f.id}>{f.libelle}</option>
                      ))
                    )}
                  </select>

                  <select
                    value={filters.typeAnneEtude}
                    onChange={(e) => {
                      setFilters(prev => ({ ...prev, typeAnneEtude: e.target.value }));
                      setToStorage("anneeEtudeCourante", e.target.value);
                    }}
                    className="p-2 border-none rounded-md shadow-sm text-sm"
                  >
                    <option value="1">1ere année</option>
                    <option value="2">2eme année</option>
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
                    {data.matieres.map((matiere, index) => (
                      <tr
                        key={matiere.id}
                        className={`cursor-pointer ${
                          ui.selectedIndex === index
                            ? "bg-blue-300"
                            : index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-100"
                        }`}
                        onClick={() => handleRowClick(index, matiere.id)}
                      >
                        <td className="px-4 py-2 text-center">MAT{matiere.id}</td>
                        <td className="px-4 py-2 text-center">{matiere.libelle}</td>
                        <td className="px-4 py-2 text-center">{matiere.abreviation}</td>
                        <td className="px-4 py-2 text-center">
                          {matiere.optionnelle === 1 ? "Oui" : "Non"}
                        </td>
                        <td className="px-4 py-2 text-center">{matiere.coefficient}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <button
                className={`px-4 py-2 w-70 h-15 text-white font-bold rounded self-center ${
                  ui.selectedIndex === null
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-gray-800"
                }`}
                onClick={handleValidation}
                disabled={ui.selectedIndex === null}
              >
                Valider
              </button>
            </div>
          </>
        )}
        {ui.showEtudiants && renderEtudiants()}
      </div>
    </div>
  );
};

export default MajNotes;