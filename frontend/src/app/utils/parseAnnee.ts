
export function getGrades(anneesEtude: AnneeEtude[]) {
    const niveaux = anneesEtude.map(item => item.niveau);
    const grades =  [...new Set(niveaux.map(item => item.split(" ")[0]))]
    return grades;
}

export function getAnneeEtudeIndex(anneeCur: String, anneesEtudes: AnneeEtude[]) {
    const result = anneesEtudes.find(item => item.niveau === anneeCur)
    if (result) {
        console.log("anneeEtudeIndex trouvé :", result.id);
        return result.id
    }
    return -1;
}

export function getAnneeUnivIndex(anneeUniv: string, anneesUniv: anneeUniv[]) {
    console.log("** function **")
    const result = anneesUniv.find(item => item.annee_univ.trim() === anneeUniv.trim())
    if (result) {
        console.log("anneeUnivIndex trouvé :", result.id);
        return result.id;
    } 
    return -1;
}   

export function getSessionIndex(session: string, sessions: Session[]) {
    const result = sessions.find(item => item.libelle === session);
    if (result) {
        console.log("sessionIndex trouvé :", result.id);
        return result.id
    }
    return -1;
}
