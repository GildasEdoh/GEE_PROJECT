import api from "./ApiService";
/**
 * CRUD service for AnneesEtude
 */

// Base path for AnneesEtude
const path = "/anneesEtude";

class AnneesEtudeService {
  private static instance: AnneesEtudeService;

  // Default constructor
  private constructor() {}

  public static getInstance(): AnneesEtudeService {
    if (!AnneesEtudeService.instance) {
      AnneesEtudeService.instance = new AnneesEtudeService();
    }
    return AnneesEtudeService.instance;
  }

  // Return the list of all AnneesEtude
  public async getAllAnneesEtude(): Promise<Object> {
    const response = await api.get(path);
    return response.data;
  }

  // Create a new AnneesEtude
  public async addAnneesEtude(student: any): Promise<any> {
    
  }

  // Delete a AnneesEtude
  public async deleteAnneesEtude(id: string): Promise<any> {
    
  }

}

export default AnneesEtudeService.getInstance();
