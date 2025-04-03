import api from "./ApiService"
/**
 * CRUD service for notes
 */

const path = "/notes"
class NoteService {
    private static instance: NoteService;

    // Default constructor
    private constructor() {}

    public static getInstance(): NoteService {
        if (!NoteService.instance) {
            NoteService.instance = new NoteService();
        }
        return NoteService.instance
    }

    // Return the list of all notes 
    public async getAllEtudiant(): Promise<any> {
        const response = await api.get(path);
        return response.data
    }

    // Add a new note
    public async addEtudiant(nom: string): Promise<any> {
        const response = await api.post(path, {nom})
    }

    // Update a note
    public async updateEtudiant(): Promise<any> {

    }

    // Delete a note
    public async deleteEtudiant() : Promise<any>{

    }
}

export default NoteService.getInstance();