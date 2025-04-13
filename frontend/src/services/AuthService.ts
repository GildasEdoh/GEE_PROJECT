import api from "./ApiService"
import EtudiantService from "./EtudiantService";

/**
 * Authentification service
 */

class AuthService {
    private static instance: AuthService;
    private constructor() {}

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance
    }

    // 1️⃣ Récupérer le token CSRF avant toute requête
    public async getCsrfToken() {
      await api.get("/sanctum/csrf-cookie");
    };
    
    // 2️⃣ Fonction pour se connecter
    public async loginUser(email: string, password: string) {
      await this.getCsrfToken(); // ⚠️ Nécessaire pour Sanctum
      return api.post("/login", { email, password });
    };
    
    // 3️⃣ Vérifier l'utilisateur connecté
    public getUser() : object{
      return api.get("/api/user");
    };
}