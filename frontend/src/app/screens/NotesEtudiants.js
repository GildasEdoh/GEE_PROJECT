import { useState } from "react";
/**
 * Return a table sudents notes 
 * 
 */

const NotesEtudiants = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [codeSelected, setCodeSelected] = useState("")
  const handleRowClick = (index, codeMat) => {
    setSelectedIndex(index);
    setCodeSelected(codeMat)
  };

  const handleValidation = () => {
    console.log("codeSelected " + codeSelected)
    alert("Vous avez cliqué : " + codeSelected);
  };

  return (
    <div className="p-6 bg-transparent w-full flex flex-col gap-6">

    </div>
  );
};

export default NotesEtudiants;
