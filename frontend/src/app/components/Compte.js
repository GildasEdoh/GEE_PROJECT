"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Compte = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    currentPassword: "",
    username: "JeanDupont",
    newPassword: "",
    confirmPassword: "",
  });

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const verifyCurrentPassword = () => {
    // Remplace cette condition par un vrai appel backend si besoin
    if (form.currentPassword === "password123") {
      setIsPasswordValid(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setIsPasswordValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setConfirmError(true);
      return;
    }

    setConfirmError(false);

    console.log("Formulaire soumis :", form);
    // Ici, tu envoies les données à ton backend
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <div className="flex flex-col items-center text-center">
        <img
          src="/path/to/profile.jpg"
          alt="Admin"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4">Jean Dupont</h2>
        <p className="text-gray-600">Administrateur Système</p>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">
          Modifier le profil
        </button>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Informations personnelles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Email:</span> admin@example.com
          </div>
          <div>
            <span className="font-semibold">Téléphone:</span> +228 90 00 00 00
          </div>
          <div>
            <span className="font-semibold">Rôle:</span> Super Administrateur
          </div>
          <div>
            <span className="font-semibold">Dernière connexion:</span> 16 mai 2025 à 14:32
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Activité récente</h3>
        <ul className="text-gray-600 list-disc list-inside">
          <li>Ajouté un nouvel étudiant</li>
          <li>Modifié les résultats de l’évaluation</li>
          <li>Consulté le tableau des statistiques</li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Compte;
