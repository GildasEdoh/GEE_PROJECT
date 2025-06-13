import api from "./ApiService";
/**
 * CRUD service for Etudiants
 */

// Base path for etudiants
const path = "/etudiants";
const filteredPath = path + "/filtrage"

class EtudiantService {
  private static instance: EtudiantService;

  // Default constructor
  private constructor() { }

  public static getInstance(): EtudiantService {
    if (!EtudiantService.instance) {
      EtudiantService.instance = new EtudiantService();
    }
    return EtudiantService.instance;
  }

  // Return the list of all etudiants
  public async getAllEtudiant(): Promise<Object> {
    const response = await api.get(path);
    return response.data;
  }

  // Create a new etudiant
  public async addEtudiant(student: any): Promise<any> {
    const response = await api.post(path, student);
    return response.data;
  }

  //  Update a etudiant
  public async updateEtudiant(student: any): Promise<Object> {
    const response = await api.put(path + `/${student.numero_carte}`, student);
    return response.data;
  }

  // Delete a etudiant
  public async deleteEtudiant(id: string): Promise<any> {
    const response = await api.delete(path + `/${id}`);
    return response.data;
  }
  // Return the list of all etudiants by subject
  public async getAllEtudiantsBySubject(id_matiere: string): Promise<Object> {
    const body = {
      "id_etablissement": 1,
      "id_filiere": 3,
      "id_annee_etude": 6,
      "id_annee_univ": 2,
      "id_session": 1,
      "id_evaluation": 1,
      "id_matiere": id_matiere
    }
    const response = await api.post(path + `/matieres`, body);
    return response.data;
  }

  public async getEtudiantByFiltre(idEtab: String, idFiliere: String, idAnneeEtu: String, idAnneUniv: String, idSession: String ): Promise<Object> {
    const body = {
      "id_etablissement": idEtab,
      "id_filiere": idFiliere,
      "id_annee_etude": idAnneeEtu,
      "id_annee_univ": idAnneUniv,
      "id_session": idSession
    }
    const response = await api.post(filteredPath, body);
    return response.data;
  }

}

export default EtudiantService.getInstance();
