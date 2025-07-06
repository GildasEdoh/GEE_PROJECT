import React, { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
//import { Separator } from "@/components/ui/separator";

// Import des services (tu dois les créer dans NoteService.js par exemple)
import NoteService from "@/services/NoteService";

const Statistique = () => {
  const [repartitionNotes, setPerformances] = useState([]);
  const [frequenceResultats, setFrequenceResultats] = useState([]);
  const [etudiantMention, setEtudiantMention] = useState([]);
  const [recaleMatieres, setFrequenceRecales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const performancesData = await NoteService.getRepartitionsNotes(1,3,5,6,2,1,1);
        const frequenceResultatsData = await NoteService.getFrequenceParMatiere();
        const frequenceRecalesData = await NoteService.getRecalesMatiere();
        const etudiantMentionData = await NoteService.getEtudiantMention();

        setPerformances(performancesData);
        setFrequenceResultats(frequenceResultatsData);
        setFrequenceRecales(frequenceRecalesData);
        setEtudiantMention(etudiantMentionData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Repartition des notes par matière */}
      <div className="rounded-2xl shadow-lg border">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Repartition des notes par matière</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={repartitionNotes}>
              <XAxis dataKey="matiere" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="note" fill="#9953FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fréquences des résultats / matière */}
      <div className="rounded-2xl shadow-lg border">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Fréquences des résultats par  matière</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-semibold">MATIÈRES</th>
                  <th className="px-4 py-2 font-semibold">REÇUS</th>
                  <th className="px-4 py-2 font-semibold">RECALÉS</th>
                  <th className="px-4 py-2 font-semibold">ABSENTS</th>
                  <th className="px-4 py-2 font-semibold">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {frequenceResultats.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">{item.matiere}</td>
                    <td className="px-4 py-2">{item.recus}</td>
                    <td className="px-4 py-2">{item.recales}</td>
                    <td className="px-4 py-2">{item.absents}</td>
                    <td className="px-4 py-2">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fréquences des récalés / matière */}
      <div className="rounded-2xl shadow-lg border">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Fréquence des récalés par matière</h2>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-semibold">MATIÈRES</th>
                  <th className="px-4 py-2 font-semibold">RECALÉS</th>
                  <th className="px-4 py-2 font-semibold">ABSENTS</th>
                  <th className="px-4 py-2 font-semibold">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {recaleMatieres.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">{item.matiere}</td>
                    <td className="px-4 py-2">{item.recales}</td>
                    <td className="px-4 py-2">{item.absents}</td>
                    <td className="px-4 py-2">{item.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-medium">
                  <td className="px-4 py-2">Total recalés</td>
                  <td className="px-4 py-2">
                    {recaleMatieres.reduce((sum, i) => sum + i.recales, 0)}
                  </td>
                  <td colSpan={2}></td>
                </tr>
                <tr className="font-medium">
                  <td className="px-4 py-2">Total absents</td>
                  <td className="px-4 py-2">
                    {recaleMatieres.reduce((sum, i) => sum + i.absents, 0)}
                  </td>
                  <td colSpan={2}></td>
                </tr>
                <tr className="font-medium">
                  <td className="px-4 py-2">Moyenne de recalés</td>
                  <td className="px-4 py-2">
                    {recaleMatieres.length > 0
                      ? (
                          recaleMatieres.reduce((sum, i) => sum + i.recales, 0) /
                          recaleMatieres.length
                        ).toFixed(1) + " par matière"
                      : "N/A"}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Mention des etudiants*/}
{/* Mention des étudiants */}
<div className="rounded-2xl shadow-lg border">
  <div className="p-6">
    <h2 className="text-xl font-bold mb-4">Répartition des étudiants par mentions</h2>
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full text-sm text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 font-semibold">Mention</th>
            <th className="px-4 py-2 font-semibold">Intervalle</th>
            <th className="px-4 py-2 font-semibold">Nb Étudiants</th>
            <th className="px-4 py-2 font-semibold">Fréquence (%)</th>
            <th className="px-4 py-2 font-semibold">Moyenne</th>
            <th className="px-4 py-2 font-semibold">Min</th>
            <th className="px-4 py-2 font-semibold">Max</th>
            <th className="px-4 py-2 font-semibold">Écart-type</th>
            <th className="px-4 py-2 font-semibold">Session</th>
          </tr>
        </thead>
        <tbody>
          {etudiantMention.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-2">{item.mention}</td>
              <td className="px-4 py-2">{item.intervalle ?? '-'}</td>
              <td className="px-4 py-2">{item.nb_etudiants}</td>
              <td className="px-4 py-2">{item.frequence_pourcent?.toFixed(2) ?? '-'}</td>
              <td className="px-4 py-2">{item.moyenne_mention?.toFixed(2) ?? '-'}</td>
              <td className="px-4 py-2">{item.min_mention ?? '-'}</td>
              <td className="px-4 py-2">{item.max_mention ?? '-'}</td>
              <td className="px-4 py-2">{item.ecart_type_mention?.toFixed(2) ?? '-'}</td>
              <td className="px-4 py-2">{item.session}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="font-medium">
          <tr>
            <td className="px-4 py-2">TOTAL</td>
            <td className="px-4 py-2">-</td>
            <td className="px-4 py-2">
              {etudiantMention.reduce((sum, i) => sum + i.nb_etudiants, 0)}
            </td>
            <td className="px-4 py-2">100.00</td>
            <td className="px-4 py-2">
              {(
                etudiantMention.reduce((sum, i) => sum + (i.moyenne_mention || 0), 0) /
                etudiantMention.length
              ).toFixed(2)}
            </td>
            <td className="px-4 py-2">-</td>
            <td className="px-4 py-2">-</td>
            <td className="px-4 py-2">-</td>
            <td className="px-4 py-2">-</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>



      
    </div>
  );
};

export default Statistique;
