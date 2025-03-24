// components/Login.js
"use client"; // Ajoutez cette ligne

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Sign = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword0, setShowPassword0] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false); // État pour masquer/afficher le mot de passe
    const togglePasswordVisibility0 = () => {
        setShowPassword0(!showPassword0); // Bascule entre true et false
    };
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1); // Bascule entre true et false
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', name);
        console.log('Surname:', surName);
        console.log('Email:', mail);
        console.log('Password:', password);
        console.log('Confirm:', confirm);
    };

    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <Image src="/ul.png" alt="Illustration" width={400} height={100} />
            </div>
            <div>
                <h1 style={styles.title}>Gestion des Examens Etudiants</h1>
                <div style={styles.inscription}>
                    <h2 style={styles.subtitle}>INSCRIPTION</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={styles.input}
                                placeholder="Nom"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                type="text"
                                id="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                style={styles.input}
                                placeholder="Prénoms"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                type="email"
                                id="mail"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                style={styles.input}
                                placeholder="Entrez votre adresse email"
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                type={showPassword0 ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword (e.target.value)}
                                style={styles.input}
                                placeholder="Mot de passe"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility0}
                                style={styles.eyeButton}
                            >
                                {showPassword0 ? '👁️' : '👁‍🗨'} {/* Change l'icône en fonction de l'état */}
                            </button>
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                type={showPassword1 ? 'text' : 'password'}
                                id="confirm"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                style={styles.input}
                                placeholder="Confirmer le mot de passe"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility1}
                                style={styles.eyeButton1}
                            >
                                {showPassword1 ? '👁️' : '👁‍🗨'} {/* Change l'icône en fonction de l'état */}
                            </button>
                        </div>
                        <div style={styles.buttonGroup}>
                            <button type="button" style={styles.cancelButton}>Annuler</button>
                            <Link href={"/Home/page.js"}>
                                <button type="submit" style={styles.submitButton}>S&apos;inscrire</button>
                            </Link>
                        </div>
                        <div style={styles.textLink}>
                            <Link href="/SignIn">
                                <h4>Déjà inscrit ? Si oui...Cliquez</h4>
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
    },
    imageContainer: {
        position: 'relative',
        width: '350px',
        backgroundColor: 'white',
        marginRight: '215px',
    },
    image: {
        width: "100px",
        height: "100px",
    },
    title: {
        fontSize: '2.6rem',
        marginBottom: '0.5rem',
        marginTop: '20px',
        fontFamily: 'limelight',
        fontWeight: 'Bold',
        color: 'white',
    },
    inscription : {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '470px',
        marginTop: '50px',
        padding: '20px 50px 20px 60px',
        borderRadius: '15px',
    },
    subtitle: {
        position: 'relative',
        fontSize: '1.5rem',
        marginBottom: '2rem',
        fontFamily: 'limelight',
        fontWeight: 'Bold',
        left: '32%',
        color: '#6988ED',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '400px',
    },
    formGroup: {
        marginBottom: '1.4rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        fontSize: '1rem',
        backgroundColor: '#ECECEC',
        borderRadius: '10px',
    },
    eyeButton: {
        position: 'absolute',
        right: '80px',
        top: '59%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    eyeButton1: {
        position: 'absolute',
        right: '80px',
        top: '72%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    cancelButton: {
        width: '120px',
        padding: '5px 20px 5px 20px',
        fontSize: '1rem',
        backgroundColor: '#B91919',
        border: 'none',
        borderRadius: '15px',
        color: '#fff',
        cursor: 'pointer',
    },
    submitButton: {
        width: '120px',
        padding: '5px 20px 5px 20px',
        fontSize: '1rem',
        backgroundColor: '#1B5A25',
        color: '#fff',
        border: 'none',
        borderRadius: '15px',
        cursor: 'pointer',
    },
    textLink: {
        position: 'relative',
        color: 'skyblue',
        cursor: 'pointer',
        top: '20px',
        left: '27%',
        fontFamily: 'limelight',
        fontWeight: 'Bold',
    }
};

export default Sign;