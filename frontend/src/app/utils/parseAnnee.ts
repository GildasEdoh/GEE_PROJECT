
export function getGrades(anneesEtude: []) {
    const niveaux = anneesEtude.map(item => item.niveau);
    const grades =  [...new Set(niveaux.map(item => item.split(" ")[0]))]
    return grades;
}

export function getAnneeEtudeIndex(grade: String, annee: String, anneesEtudes: []) {
    const anneeEtude = grade + ' ' + annee;
    const anneeIndex = anneesEtudes.findIndex(item => item.niveau === anneeEtude)
    console.log("Index trouvé :", anneeIndex);
    return anneeIndex;
}