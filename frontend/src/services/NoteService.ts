import api from "./ApiService";

const path = "/notes";
const repartition_notes_path = path + `/repartition-notes`;
const recale_matiere_path = path + `/nombre-recales-matieres`;
const etudiant_mention_path = path + `/etudiants-mention`;
const frequence_matiere_path = path + `/frequence-matiere-globale`;
class NoteService {
  private static instance: NoteService;

  private constructor() {}

  public static getInstance(): NoteService {
    if (!NoteService.instance) {
      NoteService.instance = new NoteService();
    }
    return NoteService.instance;
  }

  // Récupérer toutes les notes
  public async getAllNotes(): Promise<any> {
  try {
    const response = await api.get(path);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des notes :", error);
    throw error;
  }
  }


  // Ajouter une note
  public async addNote(note: {
    fk_etudiant: number;
    fk_evaluation: number;
    valeur: number;
    gele?: boolean;
  }): Promise<any> {
    const response = await api.post(path, note);
    return response.data;
  }

  // Mettre à jour une note
  public async updateNote(
    id: number,
    updateData: {
      valeur?: number;
      gele?: boolean;
    }
  ): Promise<any> {
    const response = await api.put(`${path}/${id}`, updateData);
    return response.data;
  }

  // Supprimer une note
  public async deleteNote(id: number): Promise<any> {
    const response = await api.delete(`${path}/${id}`);
    return response.data;
  }

  // Récupérer une note spécifique
  public async getNote(id: number): Promise<any> {
    const response = await api.get(`${path}/${id}`);
    return response.data;
  }

  public async getRepartitionsNotes(
  idEtab: string,
  idFiliere: string,
  idParcours: string,
  idAnneeEtu: string,
  idAnneeUniv: string,
  idSession: string,
  idTypeEval: string
  ): Promise<Object> {
  const body = {
    id_etablissement: idEtab,
    id_filiere: idFiliere,
    id_parcours: idParcours,
    id_annee_etude: idAnneeEtu,
    id_annee_univ: idAnneeUniv,
    id_session_annee: idSession,
    id_type_evaluation: idTypeEval
  };

  const response = await api.post(repartition_notes_path, body);
  return response.data;
  }
  public async getRecalesMatiere(
  idEtab: string,
  idFiliere: string,
  idParcours: string,
  idAnneeEtu: string,
  idAnneeUniv: string,
  idSession: string,
  idTypeEval: string
  ): Promise<Object> {
  const body = {
    id_etablissement: idEtab,
    id_filiere: idFiliere,
    id_parcours: idParcours,
    id_annee_etude: idAnneeEtu,
    id_annee_univ: idAnneeUniv,
    id_session_annee: idSession,
    id_type_evaluation: idTypeEval
  };

  const response = await api.post(recale_matiere_path, body);
  return response.data;
  }
  public async getEtudiantMention(
  idEtab: string,
  idFiliere: string,
  idParcours: string,
  idAnneeEtu: string,
  idAnneeUniv: string,
  idSession: string,
  idTypeEval: string
  ): Promise<Object> {
  const body = {
    id_etablissement: idEtab,
    id_filiere: idFiliere,
    id_parcours: idParcours,
    id_annee_etude: idAnneeEtu,
    id_annee_univ: idAnneeUniv,
    id_session_annee: idSession,
    id_type_evaluation: idTypeEval
  };

  const response = await api.post( etudiant_mention_path , body);
  return response.data;
  }
  public async getFrequenceParMatiere(
  idEtab: string,
  idFiliere: string,
  idParcours: string,
  idAnneeEtu: string,
  idAnneeUniv: string,
  idSession: string,
  idTypeEval: string
  ): Promise<Object> {
    const body = {
      id_etablissement: idEtab,
      id_filiere: idFiliere,
      id_parcours: idParcours,
      id_annee_etude: idAnneeEtu,
      id_annee_univ: idAnneeUniv,
      id_session_annee: idSession,
      id_type_evaluation: idTypeEval
    };

    const response = await api.post(frequence_matiere_path, body);
    return response.data;
  }

}

export default NoteService.getInstance();
