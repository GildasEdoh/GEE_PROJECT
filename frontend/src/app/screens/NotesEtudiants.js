// import { useState } from "react";
// /**
//  * Return a table sudents notes 
//  * 
//  */

// const afficheEtudiants = (isLoading, ) => {

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//     if (isLoading) {
//       return (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
//         </div>
//       );
//     } else if (error) {
//       return (
//         <div className="ml-64 mt-20 w-2/3">
//           <div className="bg-red-100 text-red-700 h-50 rounded shadow-md text-center text-3xl">
//             ⚠️ Impossible de récupérer la liste. Erreur serveur
//           </div>
//         </div>
//       );
//     } else if (etudiants.length === 0) {
//       return (
//         <div className="ml-60 mt-20 w-2/3 h-2/3">
//           <div className="bg-yellow-100 text-yellow-700 h-50 rounded shadow-md text-center text-3xl">
//             Aucune donnée disponible pour cette matière.
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div className="ml-5 mt-0 w-full">
//           <div className="flex items-center gap-4 ml-10">
//             <span className="text-black font-bold text-sm">
//                 Matiere:
//             </span>
//             <select
//                 value={etudiants[0].matiere}
//                 className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white ml-1"
//               >
//                 <option>{etudiants[0].matiere}</option>
//               </select>
            
//             <span className="text-black font-bold text-sm ml-3">
//                 Parcours: 
//             </span>
//             <select
//               value={typeParcours}
//               onChange={(e) => setTypeParcours(e.target.value)}
//               className="p-2 border-none rounded-md shadow-sm text-sm"
//             >
//               <option value="admis">CAPACITE Droit 1</option>
//             </select>

//               <span className="text-black font-bold text-sm ml-3">
//                 Evaluation
//               </span>
//               <select
//                 value={evaluation}
//                 onChange={(e) => setEvaluation(e.target.value)}
//                 className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white "
//               >
//                 <option>Exam Harmattan </option>
//                 <option>Exam Mousson </option>
//               </select>

//             <div>
//               <span className="text-black font-bold text-sm ml-5">
//                 Type d'evaluation: 
//               </span>
//               <select
//                 value={evaluation}
//                 onChange={(e) => setEvaluation(e.target.value)}
//                 className="px-2 py-1/2 rounded border-none bg-blue-500 focus:outline-none text-sm text-white ml-1"
//               >
//                 <option>Devoir</option>
//                 <option>Examen</option>
//               </select>
//             </div>
//           </div>

//           {/* <div className="flex items-center space-x-10 ml-60 mt-7"></div> */}

//           <div className="border p-4 mt-10">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-4 py-2 text-sm text-center">N° CARTE</th>
//                   <th className="px-4 py-2 text-sm text-center">NOM</th>
//                   <th className="px-4 py-2 text-sm text-center">PRÉNOMS</th>
//                   <th className="px-4 py-2 text-sm text-center">SEXE</th>
//                   {evaluation === "Devoir" && (
//                     <th className="px-4 py-2 text-sm text-center">Devoir</th>
//                   )}
//                   {evaluation === "Examen" && (
//                     <>
//                       <th className="px-4 py-2 text-sm text-center">Devoir</th>
//                       <th className="px-4 py-2 text-sm text-center">Examen</th>
//                       <th className="px-4 py-2 text-sm text-center">Moyenne</th>
//                     </>
//                   )}
//                   <th className="px-4 py-2 text-sm text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {etudiants.map((etudiant, index) => (
//                   <tr
//                     key={`${etudiant.numero_carte}-${index}`}
//                     className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
//                   >
//                     <td className="px-4 py-2 text-center">
//                       {etudiant.numero_carte}
//                     </td>
//                     <td className="px-4 py-2 text-center">{etudiant.nom}</td>
//                     <td className="px-4 py-2 text-center">{etudiant.prenom}</td>
//                     <td className="px-4 py-2 text-center">{etudiant.sexe}</td>
//                     <td className="px-4 py-2 text-center">
//                       {editIndex === index ? (
//                         <input
//                           id="devoir-input"
//                           type="number"
//                           value={etudiant.note_devoir}
//                           onChange={(e) => {
//                             console.log("Valeur saisie :", e.target.value);
//                             setEditedData({
//                               ...editedData,

//                               devoir: e.target.value,
//                             });
//                           }}
//                           disabled={evaluation !== "Devoir"}
//                           className="w-16 text-center border rounded bg-gray-100 disabled:opacity-50"
//                         />
//                       ) : (
//                         etudiant.note_devoir
//                       )}
//                     </td>
//                     {evaluation === "Examen" && (
//                       <>
//                         <td className="px-4 py-2 text-center">
//                           {editIndex === index ? (
//                             <input
//                               id="examen-input"
//                               type="number"
//                               value={etudiant.note_examen}
//                               onChange={(e) =>
//                                 setEditedData({
//                                   ...editedData,
//                                   examen: e.target.value,
//                                 })
//                               }
//                               className="w-16 text-center border rounded bg-gray-100"
//                             />
//                           ) : (
//                             etudiant.note_examen
//                           )}
//                         </td>
//                         <td className="px-4 py-2 text-center">
//                           {editIndex === index ? (
//                             <input
//                               type="number"
//                               value={etudiant.total_pondere}
//                               onChange={(e) =>
//                                 setEditedData({
//                                   ...editedData,
//                                   moyenne: e.target.value,
//                                 })
//                               }
//                               className="w-16 text-center border rounded bg-gray-100"
//                             />
//                           ) : (
//                             etudiant.total_pondere
//                           )}
//                         </td>
//                       </>
//                     )}
//                     <td className="px-4 py-2 text-center">
//                       {editIndex === index ? (
//                         <div className="flex justify-center gap-2">
//                           <MdCheck
//                             className="text-green-600 cursor-pointer"
//                             onClick={() => handleSave(index)}
//                           />
//                           <MdClose
//                             className="text-red-600 cursor-pointer"
//                             onClick={handleCancel}
//                           />
//                         </div>
//                       ) : (
//                         <MdEdit
//                           className="text-blue-500 cursor-pointer mx-auto"
//                           onClick={() => handleEdit(index, etudiant)}
//                         />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     }
//   }
// export default afficheEtudiants;
