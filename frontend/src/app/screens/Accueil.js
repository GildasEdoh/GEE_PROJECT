
"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaUserGraduate, FaUserCheck, FaUserTimes } from "react-icons/fa";

const data = [
  { annee: "", admis: 0, echoues: 0 },
  { annee: "2022–2023", admis: 85, echoues: 15 },
  { annee: "2023–2024", admis: 89, echoues: 11 },
  { annee: "2024–2025", admis: 95, echoues: 5 },
];

const Acceuil = () => {
  const [typeCourbe, setTypeCourbe] = useState("admis");
  //"ml-64 mt-20 h-[calc(100vh-5rem)] overflow-y-auto p-6 space-y-6 bg-gray-100"
  return (
    <div className="bg-gray-100 p-4 flex flex-col justify-between gap-3">
      {/* Cartes Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        <div className="bg-white rounded-sm shadow-md p-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm">Admis</h3>
            <p className="text-2xl font-bold text-green-600">{data[2].admis}</p>
          </div>
          <FaUserCheck className="text-green-600 text-3xl" />
        </div>
        <div className="bg-white rounded-sm shadow-md p-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm">Échoués</h3>
            <p className="text-2xl font-bold text-red-500">{data[2].echoues}</p>
          </div>
          <FaUserTimes className="text-red-500 text-3xl" />
        </div>
        <div className="bg-white rounded-sm shadow-md p-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm">Total</h3>
            <p className="text-2xl font-bold text-blue-600">
              {data[2].admis + data[2].echoues}
            </p>
          </div>
          <FaUserGraduate className="text-blue-600 text-3xl" />
        </div>
      </div>

      {/* Sélecteur de type de courbe */}
      <div className="flex justify-end">
        <select
          value={typeCourbe}
          onChange={(e) => setTypeCourbe(e.target.value)}
          className="p-2 border rounded-sm shadow-sm text-sm"
        >
          <option value="admis">Admis</option>
          <option value="echoues">Échoués</option>
        </select>
      </div>

      {/* Courbe */}
      <div className="bg-white rounded-2xl shadow-md p-4 w-full">
        <h2 className="text-lg font-semibold mb-4">
          Évolution des {typeCourbe}
        </h2>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="annee" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  `${value}`,
                  name === "admis" ? "Admis" : "Échoués",
                ]}
              />
              <Line
                type="monotone"
                dataKey={typeCourbe}
                stroke={typeCourbe === "admis" ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Acceuil;
