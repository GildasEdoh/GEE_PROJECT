import api from "./ApiService";
/**
 * CRUD service for Evaluation
 */

// Base path for Evaluation
const path = "/evaluations";

class EvaluationService {
  private static instance: EvaluationService;

  // Default constructor
  private constructor() {}

  public static getInstance(): EvaluationService {
    if (!EvaluationService.instance) {
      EvaluationService.instance = new EvaluationService();
    }
    return EvaluationService.instance;
  }

  // Return the list of all Evaluation
  public async getAllEvaluation(): Promise<Object> {
    const response = await api.get(path);
    return response.data;
  }

  // Create a new Evaluation
  public async addEvaluation(student: any): Promise<any> {
    
  }

  // Delete a Evaluation
  public async deleteEvaluation(id: string): Promise<any> {
    
  }

}

export default EvaluationService.getInstance();
