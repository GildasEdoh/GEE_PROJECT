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
    public async addMatiere(matiere: any): Promise<any> {
        const response = await api.post(path, matiere)
        return response.data
    }

    // Update a matiere
    public async updateMatiere(student: any): Promise<any> {
        const response = await api.put(path + `/${student.id}`, student)
        return response.data
    }

    // Delete a matiere
    public async deleteMatiere(id: String) : Promise<any> {
        const response = await api.delete(path + `/${id}`)
        return response.data
    }
}

export default MatiereService.getInstance();