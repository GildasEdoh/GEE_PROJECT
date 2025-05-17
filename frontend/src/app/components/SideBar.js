// import { useState } from "react";
// import {
//   FaBook,
//   FaUsers,
//   FaClipboardList,
//   FaSignOutAlt,
//   FaChevronDown,
//   FaChevronUp,
//   FaFileAlt,
//   FaEdit,
//   FaChartBar,
//   FaWindowClose,
//   FaBars,
//   FaTools,
//   FaHome,
//   FaFile,
// } from "react-icons/fa";

// /**
//  *
//  */

// const SideBar = ({ setSelectedMenu }) => {
//   const [isEditionOpen, setIsEditionOpen] = useState(false);
//   const [isEvaluationsOpen, setIsEvaluationsOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <aside
//       className={`bg-blue-500 text-white h-screen p-4 flex z-100 flex-col fixed top-0 left-0 overflow-y-auto transition-all ${isSidebarOpen ? "w-60" : "w-20"
//         }`}
//     >
//       <button
//         className="p-2 mb-4 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer transition self-end"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         {isSidebarOpen ? <FaWindowClose /> : <FaBars />}
//       </button>

//       <h1
//         className={`text-2xl font-bold mb-6 text-center transition-all ${isSidebarOpen ? "block" : "hidden"
//           }`}
//       >
//         GEE - UL
//       </h1>

//       <ul className="space-y-2 flex-1">
//         <li>
//           <button
//             className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => setSelectedMenu("Accueil")}
//           >
//             <span className="text-lg">
//               <FaHome />
//             </span>
//             {isSidebarOpen && <span>Accueil</span>}
//           </button>
//         </li>

//         {/* Étudiants */}
//         <li>
//           <button
//             className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => setSelectedMenu("Étudiants")}
//           >
//             <FaUsers />
//             {isSidebarOpen && <span>Étudiants</span>}
//           </button>
//         </li>

//         {/* Matières */}
//         <li>
//           <button
//             className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => setSelectedMenu("Matières")}
//           >
//             <FaBook />
//             {isSidebarOpen && <span>Matières</span>}
//           </button>
//         </li>

//         {/* Évaluations avec sous-menus */}
//         <li>
//           <button
//             className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => setIsEvaluationsOpen(!isEvaluationsOpen)}
//           >
//             <div className="flex items-center space-x-3">
//               <FaClipboardList />
//               {isSidebarOpen && <span>Évaluations</span>}
//             </div>
//             {isSidebarOpen &&
//               (isEvaluationsOpen ? <FaChevronUp /> : <FaChevronDown />)}
//           </button>
//           {isEvaluationsOpen && isSidebarOpen && (
//             <ul className="ml-6 space-y-2">
//               <li>
//                 <button
//                   className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
//                   onClick={() => setSelectedMenu("Notes")}
//                 >
//                   <FaEdit />
//                   <span>Notes</span>
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
//                   onClick={() => setSelectedMenu("Admis")}
//                 >
//                   <FaUsers />
//                   <span>Admis</span>
//                 </button>
//               </li>
//               <li>
//                 <button
//                   className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-600 transition"
//                   onClick={() => setSelectedMenu("Echoues")}
//                 >
//                   <FaUsers />
//                   <span>Echoues</span>
//                 </button>
//               </li>
//             </ul>
//           )}
//         </li>

//         {/* Edition avec sous-menus */}
//         <li>
//           <button
//             className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => setIsEditionOpen(!isEditionOpen)}
//             aria-expanded={isEditionOpen}
//           >
//             <div className="flex items-center space-x-3">
//               <FaEdit />
//               {isSidebarOpen && <span>Edition</span>}
//             </div>
//             {isSidebarOpen &&
//               (isEditionOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />)}
//           </button>

//           {isEditionOpen && isSidebarOpen && (
//             <ul className="ml-6 space-y-2 mt-2">
//               <li className="list-none">
//                 <button
//                   className={`w-full flex items-center space-x-3 p-2 rounded-lg transition ${selectedMenu === 'Liste des inscrits' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
//                   onClick={() => handleSubMenuClick('Liste des inscrits')}
//                 >
//                   <FaUsers />
//                   <span>Liste des inscrits</span>
//                 </button>
//               </li>
//               <li className="list-none">
//                 <button
//                   className={`w-full flex items-center space-x-3 p-2 rounded-lg transition ${selectedMenu === 'Notes par Matières' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
//                   onClick={() => handleSubMenuClick('Notes par Matières')}
//                 >
//                   <FaFile />
//                   <span>Notes par Matières</span>
//                 </button>
//               </li>
//               <li className="list-none">
//                 <button
//                   className={`w-full flex items-center space-x-3 p-2 rounded-lg transition ${selectedMenu === 'PV individuels' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
//                   onClick={() => handleSubMenuClick('PV individuels')}
//                 >
//                   <FaFileAlt />
//                   <span>PV individuels de notes</span>
//                 </button>
//               </li>
//               <li className="list-none">
//                 <button
//                   className={`w-full flex items-center space-x-3 p-2 rounded-lg transition ${selectedMenu === 'Releves' ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
//                   onClick={() => handleSubMenuClick('Releves')}
//                 >
//                   <FaBook />
//                   <span>Releves</span>
//                 </button>
//               </li>
//             </ul>
//           )}
//         </li>

//         {/* Statistiques */}
//         <li>
//           <button
//             className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => setSelectedMenu("Statistiques")}
//           >
//             <FaChartBar />
//             {isSidebarOpen && <span>Statistiques</span>}
//           </button>
//         </li>

//         {/* Paramètres */}
//         <li>
//           <button
//             className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600 transition"
//             onClick={() => setSelectedMenu("Paramètres")}
//           >
//             <FaTools />
//             {isSidebarOpen && <span>Paramètres</span>}
//           </button>
//         </li>
//       </ul>

//       <button className="p-3 bg-red-500 flex items-center justify-center cursor-pointer space-x-2 rounded-lg hover:bg-red-600 transition">
//         <FaSignOutAlt />
//         {isSidebarOpen && <span>Se déconnecter</span>}
//       </button>
//     </aside>
//   );
// };

// export default SideBar;

'use client';
import { useState } from "react";
import {
  FaBook, FaUsers, FaClipboardList, FaSignOutAlt,
  FaChevronDown, FaChevronUp, FaFileAlt, FaEdit,
  FaChartBar, FaWindowClose, FaBars, FaTools, FaHome, FaFile
} from "react-icons/fa";

const SideBar = ({ isSidebarOpen, setSelectedMenu }) => {
  const [isEditionOpen, setIsEditionOpen] = useState(false);
  const [isEvaluationsOpen, setIsEvaluationsOpen] = useState(false);

  const handleSubMenuClick = (menuName) => {
    setSelectedMenu(menuName);
    // Fermer automatiquement le sidebar en mode mobile si nécessaire
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`bg-blue-500  hidden md:block text-white h-screen p-4 fixed top-13 bottom-0 left-0 z-10 overflow-y-auto`}
    >
      <ul className="flex flex-col items-start justify-between gap-3 w-full">
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Accueil")}
          >
            <FaHome />
            {isSidebarOpen && <span>Accueil</span>}
          </button>
        </li>

        {/* Étudiants */}
        <li>
          <button
            className="w-full flex items-center space-x-3 text-sm p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Étudiants")}
          >
            <FaUsers />
            {isSidebarOpen && <span>Étudiants</span>}
          </button>
        </li>

        {/* Matières */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Matières")}
          >
            <FaBook />
            {isSidebarOpen && <span>Matières</span>}
          </button>
        </li>

        {/* Évaluations avec sous-menus */}
        <li className="w-full">
          <button
            className="w-full flex items-center justify-between p-3 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setIsEvaluationsOpen(!isEvaluationsOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaClipboardList />
              {isSidebarOpen && <span className="mr-3">Évaluations</span>}
            </div>
            {isSidebarOpen &&
              (isEvaluationsOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {isEvaluationsOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu("Notes")}
                >
                  <FaEdit />
                  <span>Notes</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu("Admis")}
                >
                  <FaUsers />
                  <span>Admis</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu("Echoues")}
                >
                  <FaUsers />
                  <span>Echoues</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Edition */}
        <li>
          <button
            className="w-full flex items-center justify-between text-sm p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setIsEditionOpen(!isEditionOpen)}
          >
            <div className="flex items-center space-x-3">
              <FaEdit />
              {isSidebarOpen && <span className="mr-3">Edition</span>}
            </div>
            {isSidebarOpen && (isEditionOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          
          {isEditionOpen && isSidebarOpen && (
            <ul className="ml-6 space-y-2">
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu()}
                >
                  <FaUsers />
                  <span>Liste des inscrits</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu()}
                >
                  <FaFile />
                  <span>Notes par Matières</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu()}
                >
                  <FaFileAlt />
                  <span>PV individuels de notes</span>
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
                  onClick={() => setSelectedMenu()}
                >
                  <FaBook />
                  <span>Releves</span>
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* Statistiques */}
        <li>
          <button
            className="w-full flex items-center space-x-3 p-3 rounded-lg text-sm hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Statistiques")}
          >
            <FaChartBar />
            {isSidebarOpen && <span>Statistiques</span>}
          </button>
        </li>

        {/* Paramètres */}
        <li className="mb-23">
          <button
            className="w-full flex items-center space-x-3 p-3 text-sm rounded-lg hover:bg-blue-600 transition-all duration-300 ease-out cursor-pointer"
            onClick={() => setSelectedMenu("Paramètres")}
          >
            <FaTools />
            {isSidebarOpen && <span>Paramètres</span>}
          </button>
        </li>
      </ul>
      <div className="fixed bottom-0">
        <button className="py-1 px-2 bg-red-500 flex items-center justify-center cursor-pointer space-x-1 rounded-lg hover:bg-red-600 transition-all duration-300 ease-out">
          <FaSignOutAlt />
          {isSidebarOpen && <span>Se déconnecter</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;