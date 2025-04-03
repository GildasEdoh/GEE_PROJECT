"use client"; // Assure que ce composant s'exécute côté client
/**
 * 
 */
const InfoCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-48 text-center">
      <h3 className="text-gray-700 font-semibold">{title}</h3>
      <p className="text-xl font-bold text-gray-900 mt-2">{value ?? "-----"}</p>
    </div>
  );
};

export default InfoCard;