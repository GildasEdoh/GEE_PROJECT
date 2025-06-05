import api from "./ApiService";
/**
 * CRUD service for Inscription
 */

// Base path for Inscription
const path = "/inscriptions";

class InscriptionService {
  private static instance: InscriptionService;

  // Default constructor
  private constructor() {}

  public static getInstance(): InscriptionService {
    if (!InscriptionService.instance) {
      InscriptionService.instance = new InscriptionService();
    }
    return InscriptionService.instance;
  }

  // Return the list of all Inscription
  public async getAllInscription(): Promise<Object> {
    const response = await api.get(path);
    return response.data;
  }

  // Create a new Inscription
  public async addInscription(student: any): Promise<any> {
    
  }

  // Delete a Inscription
  public async deleteInscription(id: string): Promise<any> {
    
  }

    public async getParcoursIdBylibelle(libelle: string): Promise<any> {
        const body =  {
            "libelle": libelle
        }
        const response = await api.post(path + '/parcoursId', body);
        return response.data;
    }

    public async insertAll(inscriptions: any): Promise<any> {
        const body = {
            "inscriptions": inscriptions
        }
        const response = await api.post(path + '/bulk', body);
        return response.data;
    }
}

export default InscriptionService.getInstance();
