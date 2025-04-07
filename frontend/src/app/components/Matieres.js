import { useState } from "react";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
/**
 * 
 */

const Matieres = () => {
  return (
    <div className=" ml-64 mt-15">
      <div className="p-6 bg-transparent shadow-md rounded-lg w-full">
        <h2 className="text-2xl font-bold text-center">Liste des matières</h2>

        {/* Tableau des matières */}
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-md mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-700 text-sm">NUMERO</th>
                <th className="px-4 py-2 text-gray-700 text-sm">LIBELLE</th>
                <th className="px-4 py-2 text-gray-700 text-sm">ABRÉVIATION</th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  OPTIONNELLE
                </th>
                <th className="px-4 py-2 text-gray-700 text-sm text-center">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple de données */}
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>

              {/* Exemple de données */}
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>

              {/* Exemple de données */}
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>

              {/* Exemple de données */}
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Ajouter une matière
          </button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Modifier une matière
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Supprimer une matière
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matieres;
