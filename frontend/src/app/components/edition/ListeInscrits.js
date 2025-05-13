import React from 'react';

const ListeInscrits = () => {
    // Données simulées
    const etudiants = [
        { id: 1, nom: 'Doe', prenom: 'John', matricule: 'MAT001', filiere: 'Informatique' },
        { id: 1, nom: 'Doe', prenom: 'John', matricule: 'MAT001', filiere: 'Informatique' },
        { id: 1, nom: 'Doe', prenom: 'John', matricule: 'MAT001', filiere: 'Informatique' },
        { id: 1, nom: 'Doe', prenom: 'John', matricule: 'MAT001', filiere: 'Informatique' },
        { id: 1, nom: 'Doe', prenom: 'John', matricule: 'MAT001', filiere: 'Informatique' },
        // ... autres étudiants
    ];

    return (
        <div className="p-6 w-300 pl-70 pt-15">
            <h1 className="text-2xl font-bold mb-6">Liste des étudiants inscrits</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-260">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">Matricule</th>
                            <th className="px-6 py-3 text-left">Nom</th>
                            <th className="px-6 py-3 text-left">Prénom</th>
                            <th className="px-6 py-3 text-left">Filière</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {etudiants.map(etudiant => (
                            <tr key={etudiant.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{etudiant.matricule}</td>
                                <td className="px-6 py-4">{etudiant.nom}</td>
                                <td className="px-6 py-4">{etudiant.prenom}</td>
                                <td className="px-6 py-4">{etudiant.filiere}</td>
                                <td className="px-6 py-4">
                                    <button className="text-blue-600 hover:text-blue-800 mr-3 cursor-pointer">
                                        Voir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListeInscrits;