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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Gérer mon compte
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Mot de passe actuel */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            Mot de passe actuel
          </label>
          <input
            type={showCurrent ? "text" : "password"}
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
            className={`w-full border px-3 py-2 rounded-md ${
              passwordError ? "border-red-500" : ""
            }`}
          />
          <span
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-10 top-9 cursor-pointer text-gray-500"
          >
            {showCurrent ? "🙈" : "👁️"}
          </span>
          <span
            onClick={verifyCurrentPassword}
            className="absolute right-3 top-9 cursor-pointer text-green-600 font-bold"
            title="Vérifier le mot de passe"
          >
            ✔️
          </span>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">Mot de passe incorrect</p>
          )}
        </div>

        {/* Nom d'utilisateur */}
        <div>
          <label className="block text-sm font-medium mb-1">User Name</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            disabled={!isPasswordValid}
            className="w-full border rounded-md px-3 py-2 disabled:opacity-50"
          />
        </div>

        {/* Nouveau mot de passe */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            Nouveau mot de passe
          </label>
          <input
            type={showNew ? "text" : "password"}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            disabled={!isPasswordValid}
            className="w-full border rounded-md px-3 py-2 disabled:opacity-50"
          />
          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showNew ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirmation du mot de passe */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={!isPasswordValid}
            className={`w-full border rounded-md px-3 py-2 disabled:opacity-50 ${
              confirmError ? "border-red-500" : ""
            }`}
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
          {confirmError && (
            <p className="text-red-500 text-sm mt-1">
              Les mots de passe ne correspondent pas
            </p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
};

export default Compte;
