import React from 'react';

const Releves = () => {
    const releves = [
        {
            annee: '2023-2024',
            session: 'Session Principale',
            date: '15/06/2024',
            lien: '/releves/releve-123.pdf'
        },
        {
            annee: '2023-2024',
            session: 'Session Principale',
            date: '15/06/2024',
            lien: '/releves/releve-123.pdf'
        },
        {
            annee: '2023-2024',
            session: 'Session Principale',
            date: '15/06/2024',
            lien: '/releves/releve-123.pdf'
        },
        {
            annee: '2023-2024',
            session: 'Session Principale',
            date: '15/06/2024',
            lien: '/releves/releve-123.pdf'
        },
        {
            annee: '2023-2024',
            session: 'Session Principale',
            date: '15/06/2024',
            lien: '/releves/releve-123.pdf'
        },
        // ... autres relevés
    ];

    return (
        <div className="flex flex-col p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6">Relevés de Notes</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden w-260">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left">Année Académique</th>
                            <th className="px-6 py-3 text-left">Session</th>
                            <th className="px-6 py-3 text-left">Date</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {releves.map((releve, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{releve.annee}</td>
                                <td className="px-6 py-4">{releve.session}</td>
                                <td className="px-6 py-4">{releve.date}</td>
                                <td className="px-6 py-4">
                                    <a
                                        href={releve.lien}
                                        className="text-blue-600 hover:text-blue-800 mr-3"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Télécharger
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Releves;