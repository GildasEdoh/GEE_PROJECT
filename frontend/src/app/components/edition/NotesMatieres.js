import React from "react";

const NotesMatieres = () => {
  const matieres = [
    {
      nom: "Mathématiques",
      notes: [
        { etudiant: "Doe John", note: 15, rang: 2 },
        { etudiant: "Doe John", note: 15, rang: 2 },
        { etudiant: "Doe John", note: 15, rang: 2 },
        { etudiant: "Doe John", note: 15, rang: 2 },
        { etudiant: "Doe John", note: 15, rang: 2 },
        // ... autres notes
      ],
    },
    // ... autres matières
  ];

  return (
    <div className="p-6 w-300 pl-70 pt-15">
      <h1 className="text-2xl font-bold mb-6">Notes par Matières</h1>

      <div className="space-y-6">
        {matieres.map((matiere) => (
          <div key={matiere.nom} className="bg-white rounded-lg shadow-md p-4 w-260">
            <h2 className="text-xl font-semibold mb-4">{matiere.nom}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Étudiant</th>
                    <th className="text-left pb-2">Note</th>
                    <th className="text-left pb-2">Rang</th>
                  </tr>
                </thead>
                <tbody>
                  {matiere.notes.map((note, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2">{note.etudiant}</td>
                      <td className="py-2">{note.note}/20</td>
                      <td className="py-2">{note.rang}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesMatieres;
