import api from "./ApiService";
/**
 * CRUD service for Filiere
 */

// Base path for Filiere
const path = "/filieres";

class FiliereService {
  private static instance: FiliereService;

  // Default constructor
  private constructor() {}

  public static getInstance(): FiliereService {
    if (!FiliereService.instance) {
      FiliereService.instance = new FiliereService();
    }
    return FiliereService.instance;
  }

  // Return the list of all Filiere
  public async getAllFiliere(): Promise<Object> {
    const response = await api.get(path);
    return response.data;
  }

  // Create a new Filiere
  public async addFiliere(student: any): Promise<any> {
    
  }

  // Delete a Filiere
  public async deleteFiliere(id: string): Promise<any> {
    
  }

}

export default FiliereService.getInstance();
