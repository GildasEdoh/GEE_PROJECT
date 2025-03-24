export default function Etudiants() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Liste des Étudiants</h1>
      <div className="border p-4 mt-4">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-white/50">
              <th className="border p-2">CODE</th>
              <th className="border p-2">NOM</th>
              <th className="border p-2">PRÉNOMS</th>
              <th className="border p-2">SEXE</th>
              <th className="border p-2">N° CARTE</th>
              <th className="border p-2">MOYENNE</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder des étudiants */}
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
            <tr>
              <td className="border p-2">001</td>
              <td className="border p-2">Koffi</td>
              <td className="border p-2">Jean</td>
              <td className="border p-2">M</td>
              <td className="border p-2">123456</td>
              <td className="border p-2">12.5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
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
  );
}
