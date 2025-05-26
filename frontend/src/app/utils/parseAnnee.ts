
export function getGrades(anneesEtude: []) {
    const niveaux = anneesEtude.map(item => item.niveau);
    const grades =  [...new Set(niveaux.map(item => item.split(" ")[0]))]
    return grades;
}

export function getAnneeEtudeIndex(grade: String, annee: String, anneesEtudes: []) {
    const anneeEtude = grade + ' ' + annee;
    const anneeIndex = anneesEtudes.findIndex(item => item.niveau === anneeEtude)
    console.log("anneeEtudeIndex trouvé :", anneeIndex);
    return anneeIndex;
}

export function getAnneeUnivIndex(anneeUniv: string, anneesUniv: []) {
    const anneeUnivIndex = anneesUniv.findIndex(item => item.annee_univ === anneeUniv)
    console.log("anneeUnivIndex trouvé :", anneeUnivIndex);
    return anneeUnivIndex;
}   

export function getSessionIndex(session: string, sessions: []) {
    const sessionIndex = sessions.findIndex(item => item.libelle === session);
    console.log("sessionIndex trouvé :", sessionIndex);
    return sessionIndex;
}