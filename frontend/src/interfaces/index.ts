
interface AnneeEtude {
    id: String,
    niveau: String
}

interface Session {
    id: String,
    libelle: String,
    cloture: String
}

interface Filiere {
    id: String,
    libelle: String,
    fk_etablissement: String
}

interface anneeUniv {
    id: String,
    annee_univ: String
}

interface Etudiant {
    id: String               
    numero_carte: String     
    nom: String              
    prenom: String           
    date_naissance: String   
    lieu_naissance: String   
    sexe: String             
    Tel_1: String            
    id_etablissement: String 
    Nationalite: String      
    Tel_2: String            
    ville: String            
    quartier: String         
    rue: String              
}

interface Matiere {
    id: String
    libelle: String 
    abreviation: String
    optionnelle: String
    coefficient: String
}

interface etudiant {
    id: String               
    numero_carte: String     
    nom: String              
    prenom: String           
    date_naissance: String   
    lieu_naissance: String   
    sexe: String             
    Tel_1: String            
    id_etablissement: String 
    Nationalite: String      
    Tel_2: String            
    ville: String            
    quartier: String         
    rue: String              
}