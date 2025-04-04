import axios, { AxiosError } from "axios";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // 🔥 Indispensable pour Sanctum
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 1️⃣ Récupérer le token CSRF avant toute requête
export const getCsrfToken = async () => {
  await api.get("/sanctum/csrf-cookie");
};

// 2️⃣ Fonction pour se connecter
export const loginUser = async (email: string, password: string) => {
  await getCsrfToken(); // ⚠️ Nécessaire pour Sanctum
  return api.post("/login", { email, password });
};

// 3️⃣ Vérifier l'utilisateur connecté
export const getUser = async () => {
  return api.get("/api/user");
};