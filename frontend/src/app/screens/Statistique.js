import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
//import { Separator } from "@/components/ui/separator";

// Import des services (tu dois les créer dans NoteService.js par exemple)
import NoteService from "@/services/NoteService";

const Statistique = () => {
  const [performances, setPerformances] = useState([]);
  const [frequenceResultats, setFrequenceResultats] = useState([]);
  const [frequenceRecales, setFrequenceRecales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const performancesData = await NoteService.getRepartitionsNotes();
        const frequenceResultatsData = await NoteService.getFrequenceParMatiere();
        const frequenceRecalesData = await NoteService.getRecalesMatiere();

        setPerformances(performancesData);
        setFrequenceResultats(frequenceResultatsData);
        setFrequenceRecales(frequenceRecalesData);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Performances par matière */}
      <Card className="rounded-2xl shadow-lg border">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Performances par matière</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performances}>
              <XAxis dataKey="matiere" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="note" fill="#9953FF" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fréquences des résultats / matière */}
      <Card className="rounded-2xl shadow-lg border">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Fréquences des résultats / matière</h2>
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
        </CardContent>
      </Card>

      {/* Fréquences des récalés / matière */}
      <Card className="rounded-2xl shadow-lg border">
        <CardContent className="p-6">
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
                {frequenceRecales.map((item, index) => (
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
                    {frequenceRecales.reduce((sum, i) => sum + i.recales, 0)}
                  </td>
                  <td colSpan={2}></td>
                </tr>
                <tr className="font-medium">
                  <td className="px-4 py-2">Total absents</td>
                  <td className="px-4 py-2">
                    {frequenceRecales.reduce((sum, i) => sum + i.absents, 0)}
                  </td>
                  <td colSpan={2}></td>
                </tr>
                <tr className="font-medium">
                  <td className="px-4 py-2">Moyenne de recalés</td>
                  <td className="px-4 py-2">
                    {frequenceRecales.length > 0
                      ? (
                          frequenceRecales.reduce((sum, i) => sum + i.recales, 0) /
                          frequenceRecales.length
                        ).toFixed(1) + " par matière"
                      : "N/A"}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      <Separator />
    </div>
  );
};

export default Statistique;
