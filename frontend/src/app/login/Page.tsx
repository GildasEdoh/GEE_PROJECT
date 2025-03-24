"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation"; // Importer useRouter

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter(); // Initialisation de useRouter

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Appel de l'API Laravel pour se connecter
      const res = await axios.post("https://localhost:8000/login", {
        email,
        password,
      });

      const data = res.data;

      // Vérifier si la réponse contient un token
      if (data.token) {
        localStorage.setItem("auth_token", data.token); // Enregistrer le token dans le localStorage
        console.log("Connexion réussie !");
        // Rediriger l'utilisateur vers le dashboard
        router.push("/dashboard"); // Redirection vers le dashboard
      } else {
        console.error("Erreur de connexion : token manquant");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <Image src="/ul.png" alt="Illustration" width={350} height={100} />
      </div>
      <div>
        <h1 style={styles.title}>Gestion des Examens Etudiants</h1>
        <div style={styles.connexion}>
          <h2 style={styles.subtitle}>Connexion</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Adresse email"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Mot de passe"
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Se souvenir de moi
              </label>
            </div>
            <div style={styles.buttonGroup}>
              <button type="button" style={styles.cancelButton}>
                Annuler
              </button>
              <button type="submit" style={styles.submitButton}>
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    backgroundColor: "#6988ED",
    color: "black",
  },
  imageContainer: {
    position: "relative",
    width: "350px",
    backgroundColor: "white",
    marginRight: "260px",
  },
  title: {
    position: "relative",
    right: "35px",
    fontSize: "2.6rem",
    marginBottom: "0.1rem",
    marginTop: "20px",
    fontFamily: "limelight",
    fontWeight: "Bold",
    color: "white",
  },
  connexion: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "350px",
    width: "450px",
    marginTop: "50px",
    padding: "20px 30px 0px 30px",
    borderRadius: "15px",
  },
  subtitle: {
    position: "relative",
    fontSize: "2.5rem",
    marginBottom: "2rem",
    fontFamily: "limelight",
    fontWeight: "Bold",
    left: "29%",
    color: "#6988ED",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
  },
  formGroup: {
    marginBottom: "2rem",
  },
  input: {
    width: "90%",
    padding: "0.5rem",
    fontSize: "1rem",
    backgroundColor: "#D9D9D9",
    borderRadius: "10px",
  },
  buttonGroup: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "60px",
  },
  cancelButton: {
    width: "150px",
    padding: "5px 20px 5px 20px",
    fontSize: "1rem",
    backgroundColor: "#B91919",
    border: "none",
    borderRadius: "15px",
    color: "#fff",
    cursor: "pointer",
  },
  submitButton: {
    width: "150px",
    padding: "5px 20px 5px 20px",
    fontSize: "1rem",
    backgroundColor: "#1B5A25",
    color: "#fff",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
  },
};

export default Login;
