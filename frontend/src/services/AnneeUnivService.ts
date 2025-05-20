import api from "./ApiService";
/**
 * CRUD service for AnneeUniv
 */

// Base path for AnneeUnivs
const path = "/anneesUnivs";

class AnneeUnivService {
  private static instance: AnneeUnivService;

  // Default constructor
  private constructor() {}

  public static getInstance(): AnneeUnivService {
    if (!AnneeUnivService.instance) {
      AnneeUnivService.instance = new AnneeUnivService();
    }
    return AnneeUnivService.instance;
  }

  // Return the list of all AnneeUnivs
  public async getAllAnneeUniv(): Promise<Object> {
    const response = await api.get(path);
    return response.data;
  }

  // Create a new AnneeUniv
  public async addAnneeUniv(student: any): Promise<any> {
    const response = await api.post(path, student);
    return response.data;
  }

  // Update a AnneeUniv
  public async updateAnneeUniv(student: any): Promise<Object> {
    const response = await api.put(path + `/${student.numero_carte}`, student);
    return response.data;
  }

  // Delete a AnneeUniv
  public async deleteAnneeUniv(id: string): Promise<any> {
    const response = await api.delete(path + `/${id}`);
    return response.data;
  }
}

export default AnneeUnivService.getInstance();
