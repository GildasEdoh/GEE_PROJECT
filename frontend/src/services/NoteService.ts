import api from "./ApiService"
/**
 * CRUD service for notes
 */

const path = "/notes"
class NoteService {
    private static instance: NoteService;

    // Default constructor
    private constructor() { }

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
        const response = await api.post(path, { nom })
    }

    // Update a note
    public async updateEtudiant(): Promise<any> {

    }

    // Delete a note
    public async deleteEtudiant(): Promise<any> {

    }

    // Notes par matieres 
    public async getNotesParMatiere(): Promise<any> {
        const response = await api.get(`${path}/liste`);
        return response.data;
    }

    // Listing des notes par evaluation
    public async getNotesParEvaluation(evaluation: number): Promise<any> {
        const response = await api.get(`${path}/liste_evaluation/${evaluation}`);
        return response.data;
    }

    // PV des notes
    public async getListing(): Promise<any> {
        const response = await api.get(`${path}/listeAdmissible`);
        return response.data;
    }


    // 🔢 Récupérer la moyenne d’un étudiant
    public async getMoyenneByEtudiant(numeroCarte: number): Promise<any> {
        const response = await api.get(`${path}/moyenne/${numeroCarte}`);
        return response.data;
    }

    // Statistiques : Répartition des étudiants par mention
    public async getMoyenneEtMentionParEtudiant(): Promise<any> {
        const response = await api.get(`${path}/moyenne_mention`);
        return response.data;
    }
    // Statistiques : Répartition des notes par matière
    public async getnotesParMatiereEtudiant(): Promise<any> {
        const response = await api.get(`${path}/notes_matieres`);
        return response.data;
    }
    // Statistiques : Frequences des Résultat par matière
    public async getstatistiquesParMentionParMatiere(): Promise<any> {
        const response = await api.get(`${path}/statistique_matieres`);
        return response.data;
    }

    // 📋 Liste des notes + mentions
    public async getMentionParEtudiant(): Promise<any> {
        const response = await api.get(`${path}/mentions`);
        return response.data;
    }
}

export default NoteService.getInstance();

