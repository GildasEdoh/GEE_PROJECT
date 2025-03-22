const Matieres = () => {
    return (
      <div className="p-6 bg-black/50 shadow-md rounded-lg w-full">
        <h2 className="text-2xl font-bold text-center">Liste des matières</h2>
        
        {/* Tableau des matières */}
        <div className="overflow-auto rounded-lg border border-gray-200 shadow-md mt-4">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/50">
              <tr>
                <th className="p-3 border">CODE</th>
                <th className="p-3 border">LIBELLE</th>
                <th className="p-3 border">ABRÉVIATION</th>
                <th className="p-3 border">OPTIONNELLE</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple de données */}
              <tr className="bg-black">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-black">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-black">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-black">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-black">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-black">
                <td className="p-3 border">MAT101</td>
                <td className="p-3 border">Mathématiques</td>
                <td className="p-3 border">MATH</td>
                <td className="p-3 border">Non</td>
              </tr>
              <tr className="bg-black">
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
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Ajouter une matière</button>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Modifier une matière</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Supprimer une matière</button>
        </div>
      </div>
    );
  };
  
  export default Matieres;
  