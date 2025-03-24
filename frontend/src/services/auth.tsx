import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:8000";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });

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
