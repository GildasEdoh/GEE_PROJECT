import api from "./ApiService"
/**
 * CRUD service Matieres
 */

const path = "/matieres"
class MatiereService {
    private static instance: MatiereService;

    // Default constructor
    private constructor() {}

    public static getInstance(): MatiereService {
        if (!MatiereService.instance) {
            MatiereService.instance = new MatiereService();
        }
        return MatiereService.instance
    }

    // Return the list of all matieres 
    public async getAllMatiere(): Promise<any> {
        const response = await api.get(path);
        return response.data
    }

    // Create a new matiere
    public async addMatiere(nom: string): Promise<any> {
        const response = await api.post(path, {nom})
    }

    // Update a matiere
    public async updateMatiere(): Promise<any> {

    }

    // Delete a matiere
    public async deleteMatiere() : Promise<any>{

    }
}

export default MatiereService.getInstance();