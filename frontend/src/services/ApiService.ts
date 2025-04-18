import axios, {AxiosInstance} from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
/**
 * 
 */
class ApiService {
    private static instance: ApiService;
    public api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:8000",
            withCredentials: true, // 🔥 Indispensable pour Sanctum
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
        });
        // Error manager
        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error("Erreur de l'api: ", error.response?.data || error.message)
                return Promise.reject(error)
            }
        );
    }

    // Return the instance of axios 
    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance
    }
}

export default ApiService.getInstance().api;