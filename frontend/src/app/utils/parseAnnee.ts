
export function getGrades(anneesEtude: []) {
    const niveaux = anneesEtude.map(item => item.niveau);
    const grades =  [...new Set(niveaux.map(item => item.split(" ")[0]))]
    console.log('----- funcjkdnwjshkd---  ', grades);
    return grades;
}