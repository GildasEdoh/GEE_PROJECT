import api from "./ApiService"
/**
 * CRUD service for Etudiants
 */

// Base path for etudiants
const path = "/etudiants" 
class EtudiantService {
    private static instance: EtudiantService;

    // Default constructor
    private constructor() {}

    public static getInstance(): EtudiantService {
        if (!EtudiantService.instance) {
            EtudiantService.instance = new EtudiantService();
        }
        return EtudiantService.instance
    }

    // Return the list of all etudiants 
    public async getAllEtudiant(): Promise<Object> {
        const response = await api.get(path);
        return response.data
    }

    // Create a new etudiant
    public async addEtudiant(nom: string): Promise<any> {
        const response = await api.post(path, {nom})
    }

    // Update a etudiant
    public async updateEtudiant(student: String): Promise<any> {
        const response = api.put(path, student)
    }

    // Delete a etudiant
    public async deleteEtudiant() : Promise<any>{
        // const rresponse = api.delete(path)
    }
}

export default EtudiantService.getInstance();