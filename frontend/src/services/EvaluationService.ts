import api from "./ApiService"
/**
 * CRUD service
 */

const path = "/evaluations"
class EvaluationService {
    private static instance: EvaluationService;

    // Default constructor
    private constructor() {}

    public static getInstance(): EvaluationService{
        if (!EvaluationService.instance) {
            EvaluationService.instance = new EvaluationService();
        }
        return EvaluationService.instance
    }

    // Return the list of all matieres 
    public async getAllEvaluations(): Promise<any> {
        const response = await api.get(path);
        return response.data
    }

}

export default EvaluationService.getInstance();