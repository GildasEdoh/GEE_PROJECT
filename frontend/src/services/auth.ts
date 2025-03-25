import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:8000"; // Base URL du backend Laravel

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important pour Sanctum (gère les cookies de session)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const loginUser = async (email: string, password: string) => {
  console.log("Tentative de connexion...");
  try {
    // 1️⃣ Récupérer le CSRF Token d'abord
    await api.get("/sanctum/csrf-cookie");

    // 2️⃣ Ensuite, envoyer la requête de connexion
    const res = await api.post("/login", {
      email,
      password,
    });

    if (res.data?.token) {
      localStorage.setItem("auth_token", res.data.token);
      console.log("Connexion réussie !");
      return res.data;
    }

    console.warn("Aucun token reçu, vérifiez l'API.");
    return null;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Erreur de connexion :",
        error.response?.data?.message || error.message || "Erreur API inconnue."
      );
    } else {
      console.error("Erreur inattendue :", error);
    }

    return null;
  }
};
