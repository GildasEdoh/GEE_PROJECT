"use client"; // 
import Image from 'next/image';
import Link from 'next/link';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, getUser } from "../../services/auth";
/**
 * 
 */
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🚀 Bouton cliqué, soumission du formulaire...");
        setErrorMessage(null); // Réinitialiser l'erreur
        setIsLoading(true); // Activer le chargement
        alert("email" + email + " " + password)

        const data = await loginUser(email, password);
        console.log("Utilisateur connecté :", data);

        if (data) {
            console.log("Connexion réussie !");
            console.log("Utilisateur connecté :", data);
            alert("connexion" + data)
            alert("Connexion reussie ")
            router.push("/dashboard"); // Rediriger après connexion
        } else {
            setErrorMessage("Email ou mot de passe incorrect.");
        }

        setIsLoading(false); // Désactiver le chargement
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
                            {/* <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={styles.input}
                                placeholder="Nom d'utilisateur"
                            /> */}
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                                placeholder="Mot de passe"
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
                            <button type="button" style={styles.cancelButton}>Annuler</button>
                            <button
                                type="submit"
                                style={styles.submitButton}
                                disabled={isLoading}>
                                {isLoading ? "Connexion..." : "Se connecter"}
                            </button>
                            {/* <button type="submit" style={styles.submitButton}>Se connecter</button> */}
                        </div>
                        <div style={styles.textLink}>
                            <Link href="/SignUp">
                                <h4>Pas de compte ? Si non...Cliquez</h4>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        backgroundColor: '#6988ED',
        color: 'black',
        '@media (maxWidth: 1200px)': {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            padding: '20px'
        }
    },
    imageContainer: {
        position: 'relative',
        width: '350px',
        backgroundColor: 'white',
        marginRight: '260px',
        '@media (maxWidth: 1200px)': {
            marginRight: '0',
            marginBottom: '30px',
            width: '250px'
        },
        '@media (maxWidth: 768px)': {
            width: '200px'
        }
    },
    title: {
        position: 'relative',
        right: '35px',
        fontSize: '2.6rem',
        marginBottom: '0.1rem',
        marginTop: '20px',
        fontFamily: 'limelight',
        fontWeight: 'Bold',
        color: 'white',
        '@media (maxWidth: 1200px)': {
            right: '0',
            textAlign: 'center',
            fontSize: '2rem'
        },
        '@media (maxWidth: 480px)': {
            fontSize: '1.5rem'
        }
    },
    connexion: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '400px',
        width: '450px',
        marginTop: '50px',
        padding: '20px 30px 0px 30px',
        borderRadius: '15px',
        '@media (maxWidth: 768px)': {
            width: '350px',
            height: 'auto',
            padding: '20px'
        },
        '@media (maxWidth: 480px)': {
            width: '280px',
            padding: '15px'
        }
    },
    subtitle: {
        position: 'relative',
        fontSize: '2.5rem',
        marginBottom: '2rem',
        fontFamily: 'limelight',
        fontWeight: 'Bold',
        left: '29%',
        color: '#6988ED',
        '@media (maxWidth: 768px)': {
            fontSize: '2rem',
            left: '25%'
        },
        '@media (maxWidth: 480px)': {
            fontSize: '1.5rem',
            left: '20%'
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
        '@media (maxWidth: 768px)': {
            width: '100%'
        }
    },
    formGroup: {
        marginBottom: '2rem',
        '@media (maxWidth: 480px)': {
            marginBottom: '1.5rem'
        }
    },
    input: {
        width: '90%',
        padding: '0.5rem',
        fontSize: '1rem',
        backgroundColor: '#D9D9D9',
        borderRadius: '10px',
        '@media (maxWidth: 480px)': {
            width: '85%'
        }
    },
    buttonGroup: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '60px',
        '@media (maxWidth: 480px)': {
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '30px'
        }
    },
    cancelButton: {
        width: '150px',
        padding: '5px 20px 5px 20px',
        fontSize: '1rem',
        backgroundColor: '#B91919',
        border: 'none',
        borderRadius: '15px',
        color: '#fff',
        cursor: 'pointer',
        '@media (maxWidth: 480px)': {
            width: '100%'
        }
    },
    submitButton: {
        width: '150px',
        padding: '5px 20px 5px 20px',
        fontSize: '1rem',
        backgroundColor: '#1B5A25',
        color: '#fff',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
        '@media (maxWidth: 480px)': {
            width: '100%'
        }
    },
    textLink: {
        position: 'relative',
        color: 'skyblue',
        cursor: 'pointer',
        bottom: '32px',
        left: '24%',
        fontFamily: 'limelight',
        fontWeight: 'Bold',
        '@media (maxWidth: 768px)': {
            left: '20%',
            bottom: '25px'
        },
        '@media (maxWidth: 480px)': {
            left: '15%',
            bottom: '20px',
            fontSize: '0.9rem'
        }
    }
};

export default Login;