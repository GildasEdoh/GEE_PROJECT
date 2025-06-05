import api from "./ApiService";

const path = "/notes";

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
    const response = await api.get(path);
    return response.data;
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
}

export default NoteService.getInstance();
