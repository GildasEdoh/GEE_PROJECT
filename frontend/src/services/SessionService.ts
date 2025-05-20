import api from "./ApiService";
/**
 * CRUD service for Sessions
 */

// Base path for Sessions
const path = "/sessions";

class SessionService {
  private static instance: SessionService;

  // Default constructor
  private constructor() {}

  public static getInstance(): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService();
    }
    return SessionService.instance;
  }

  // Return the list of all Sessions
  public async getAllSession(): Promise<Object> {
    const response = await api.get(path);
    return response.data;
  }

  // Create a new Session
  public async addSession(student: any): Promise<any> {
    const response = await api.post(path, student);
    return response.data;
  }

  // Update a Session
  public async updateSession(student: any): Promise<Object> {
    const response = await api.put(path + `/${student.numero_carte}`, student);
    return response.data;
  }

  // Delete a Session
  public async deleteSession(id: string): Promise<any> {
    const response = await api.delete(path + `/${id}`);
    return response.data;
  }
  // Return the list of all Sessions by subject
  public async getAllSessionsBySubject(id_matiere: string): Promise<Object> {
    const response = await api.get(path + `/${id_matiere}`);
    return response.data;
  }
}

export default SessionService.getInstance();
