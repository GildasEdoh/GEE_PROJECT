import React from 'react';

const PVIndividuels = () => {
    const pvEtudiants = [
        {
            etudiant: 'Doe John',
            matricule: 'MAT001',
            notes: [
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                // ... autres notes
            ],
            moyenne: 14.5
        },
        {
            etudiant: 'Doe John',
            matricule: 'MAT001',
            notes: [
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                // ... autres notes
            ],
            moyenne: 14.5
        },
        {
            etudiant: 'Doe John',
            matricule: 'MAT001',
            notes: [
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                // ... autres notes
            ],
            moyenne: 14.5
        },
        {
            etudiant: 'Doe John',
            matricule: 'MAT001',
            notes: [
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                { matiere: 'Mathématiques', note: 15, credit: 4 },
                // ... autres notes
            ],
            moyenne: 14.5
        },
        // ... autres PV
    ];

    return (
        <div className="flex flex-col p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">PV Individuels de Notes</h1>

            <div className="space-y-6 w-260">
                {pvEtudiants.map((pv, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{pv.etudiant}</h2>
                                <p className="text-gray-600">Matricule: {pv.matricule}</p>
                            </div>
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                Moyenne: {pv.moyenne}/20
                            </div>
                        </div>

                        <table className="w-full mt-4">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left pb-2">Matière</th>
                                    <th className="text-left pb-2">Note</th>
                                    <th className="text-left pb-2">Crédits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pv.notes.map((note, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{note.matiere}</td>
                                        <td className="py-2">{note.note}/20</td>
                                        <td className="py-2">{note.credit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-4 flex justify-end">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
                                Imprimer PV
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PVIndividuels;