import api from "./ApiService";
/**
 * CRUD service for Etablissement
 */

// Base path for Etablissement
const path = "/etablissements";

class EtablissementService {
  private static instance: EtablissementService;

  // Default constructor
  private constructor() {}

  public static getInstance(): EtablissementService {
    if (!EtablissementService.instance) {
      EtablissementService.instance = new EtablissementService();
    }
    return EtablissementService.instance;
  }

  // Return the list of all Etablissement
  public async getAllEtablissement(): Promise<Object> {
    const response = await api.get(path);
    return response.data;
  }

  // Create a new Etablissement
  public async addEtablissement(student: any): Promise<any> {
    
  }

  // Delete a Etablissement
  public async deleteEtablissement(id: string): Promise<any> {
    
  }

}

export default EtablissementService.getInstance();
