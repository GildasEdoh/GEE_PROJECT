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
    public async addEtudiant(student: any): Promise<any> {
        const response = await api.post(path, student)
        return response.data
    }

    // Update a etudiant
<<<<<<< HEAD
    public async updateEtudiant(student: String): Promise<any> {
        const response = api.put(path, student)
    }

    // Delete a etudiant
    public async deleteEtudiant() : Promise<any>{
        // const rresponse = api.delete(path)
=======
    public async updateEtudiant(student: any): Promise<Object> {
        const response = await api.put(path + `/${student.numero_carte}`, student)
        return response.data
    }

    // Delete a etudiant
    public async deleteEtudiant(id: string) : Promise<any>{
        const response = await api.delete(path + `/${id}`)
        return response.data
>>>>>>> 2035294265b568124cb1283e7b2c5a79b91105d0
    }
}

export default EtudiantService.getInstance();