<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\CoefficientController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TypeDetailsController;
use App\Http\Controllers\AnneesEtudeController;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\AnneeUnivController;
use App\Http\Controllers\TypeEvaluationController;
use App\Http\Controllers\EtablissementController;
/*
|--------------------------------------------------------------------------
| Routes Web
|--------------------------------------------------------------------------
*/

Route::get('/test-db-connection', function () {
    try {
        DB::connection()->getPdo();
        return 'Database connection successful!';
    } catch (\Exception $e) {
        return 'Could not connect to the database. Please check your configuration. Error: ' . $e->getMessage();
    }
});


/*
|--------------------------------------------------------------------------
| Routes Web
|--------------------------------------------------------------------------
*/

// Route principale
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/test-db-connection', function () {
    try {
        $connection = DB::connection();
        $dbName = $connection->getDatabaseName();
        $connection->getPdo(); // Vérifie que la connexion fonctionne

        return 'Database connection successful! Connected to database: ' . $dbName;
    } catch (\Exception $e) {
        return 'Could not connect to the database. Please check your configuration. Error: ' . $e->getMessage();
    }
});


// ====================================
// 🔍 Gestion des Étudiants
// ====================================
Route::prefix('etudiants')->group(function () {
    Route::get('/', [EtudiantController::class, 'index'])->name('etudiants.index'); // Obtenir la liste des etudiant
    Route::post('/', [EtudiantController::class, 'store'])->name('etudiants.store'); // Enregistrer
    Route::get('/{id}', [EtudiantController::class, 'show'])->name('etudiants.show');       // Afficher un étudiant
    Route::put('/{id}', [EtudiantController::class, 'update'])->name('etudiants.update');   // Mettre à jour
    Route::delete('/{id}', [EtudiantController::class, 'destroy'])->name('etudiants.destroy'); // Supprimer
    Route::post('/filtrage', [EtudiantController::class, 'listeParCriteres']);

    Route::post('/bulk', [EtudiantController::class, 'bulkStore'])->name('etudiants.bulk'); // Ajouter plusieurs etudiants
    // Route::delete('/', [EtudiantController::class, 'destroyAll'])->name('etudiants.destroyAll'); // Suprimer plusieurs etudiants
    Route::post('/matieres', [EtudiantController::class, 'obtainAllEtudiantsBySubject'])->name('etudiants.obtainAllEtudiantsBySubject');       // Afficher la liste des étudiants par matière
});


// ====================================
// ⚙️ Gestion des Coefficients
// ====================================
Route::prefix('coefficients')->group(function () {
    Route::get('/', [CoefficientController::class, 'index'])->name('coefficients.index'); // Obtenir la liste des coefficients
    Route::post('/', [CoefficientController::class, 'store'])->name('coefficients.store'); // Enregistrer un coefficient
    Route::get('/{id}', [CoefficientController::class, 'show'])->name('coefficients.show'); // Afficher un coefficient spécifique
    Route::put('/{id}', [CoefficientController::class, 'update'])->name('coefficients.update'); // Mettre à jour un coefficient
    Route::delete('/{id}', [CoefficientController::class, 'destroy'])->name('coefficients.destroy'); // Supprimer un coefficient
});

// ====================================
// 📅 Gestion des Sessions
// ====================================
Route::prefix('sessions')->group(function () {
    Route::get('/', [SessionController::class, 'index'])->name('sessions.index');
    Route::post('/', [SessionController::class, 'store'])->name('sessions.store');
    Route::get('/{id}', [SessionController::class, 'show'])->name('sessions.show');
    Route::put('/{id}', [SessionController::class, 'update'])->name('sessions.update');
    Route::delete('/{id}', [SessionController::class, 'destroy'])->name('sessions.destroy');
});

// ====================================
// 📝 Gestion des Évaluations
// ====================================
Route::prefix('evaluations')->group(function () {
    Route::get('/', [EvaluationController::class, 'index'])->name('evaluations.index');
    Route::post('/', [EvaluationController::class, 'store'])->name('evaluations.store');
    Route::get('/{id}', [EvaluationController::class, 'show'])->name('evaluations.show');
    Route::put('/{id}', [EvaluationController::class, 'update'])->name('evaluations.update');
    Route::delete('/{id}', [EvaluationController::class, 'destroy'])->name('evaluations.destroy');
});

// ====================================
// 📚 Gestion des Matières
// ====================================
Route::prefix('matieres')->group(function () {
    Route::get('/', [MatiereController::class, 'index'])->name('matieres.index');
    Route::post('/', [MatiereController::class, 'store'])->name('matieres.store');
    Route::get('/{id}', [MatiereController::class, 'show'])->name('matieres.show');
    Route::put('/{id}', [MatiereController::class, 'update'])->name('matieres.update');
    Route::delete('/{id}', [MatiereController::class, 'destroy'])->name('matieres.destroy');
});

// ====================================
// 🏫 Gestion des Inscriptions
// ====================================
Route::prefix('inscriptions')->group(function () {
    Route::get('/', [InscriptionController::class, 'index'])->name('inscriptions.index');
    Route::post('/', [InscriptionController::class, 'store'])->name('inscriptions.store');
    Route::get('/{id}', [InscriptionController::class, 'show'])->name('inscriptions.show');
    Route::put('/{id}', [InscriptionController::class, 'update'])->name('inscriptions.update');
    Route::delete('/{id}', [InscriptionController::class, 'destroy'])->name('inscriptions.destroy');
    Route::post('/parcoursId', [InscriptionController::class, 'obtainIdParcoursAnneeEtude'])->name('inscriptions.obtainIdParcoursAnneeEtude');
    Route::post('/bulk', [InscriptionController::class, 'bulkStore'])->name('inscriptions.bulk'); // Ajouter plusieurs etudiants
});

// ====================================
// 🏆 Gestion des Notes
// ====================================
Route::prefix('notes')->group(function () {
    Route::get('/', [NoteController::class, 'index'])->name('notes.index'); // Obtenir la liste des notes
    Route::post('/', [NoteController::class, 'store'])->name('notes.store'); // Enregistrer une note
    Route::get('/{id}', [NoteController::class, 'show'])->name('notes.show'); // Afficher une note spécifique
    Route::put('/{id}', [NoteController::class, 'update'])->name('notes.update'); // Mettre à jour une note
    Route::delete('/{id}', [NoteController::class, 'destroy'])->name('notes.destroy'); // Supprimer une note
    Route::post('/repartition-notes', [NoteController::class, 'repartitionNotes']); // afficher la Repartition des notes par matieres

    Route::post('/nombre-recales-matieres', [NoteController::class, 'nombreRecalesToutesMatieres']); //afficher les recalés par matieres

    Route::post('/etudiants-mention', [NoteController::class, 'getStatsMentions']); //Repartition des etudiants par mention

    Route::post('/frequence-matiere-globale', [NoteController::class, 'frequenceResultatsParMatiereGlobale']);  //frequence des  resultats par matiere
});

// ====================================
// 🏆 Gestion des TypeDetails
// ====================================
Route::prefix('typedetails')->group(function () {
    Route::get('/', [TypeDetailsController::class, 'index'])->name('typedetail.index'); // Obtenir la liste des notes
    Route::post('/', [TypeDetailsController::class, 'store'])->name('typedetail.store'); // Enregistrer une note
    Route::get('/{id}', [TypeDetailsController::class, 'show'])->name('typedetail.show'); // Afficher une note spécifique
    Route::put('/{id}', [TypeDetailsController::class, 'update'])->name('typedetail.update'); // Mettre à jour une note
    Route::delete('/{id}', [TypeDetailsController::class, 'destroy'])->name('typedetail.destroy'); // Supprimer une note
});

// ====================================
// 🏆 Gestion des annees_etudes
// ====================================
Route::prefix('anneesEtude')->group(function () {
    Route::get('/', [AnneesEtudeController::class, 'index'])->name('annees_etude.index'); // Obtenir la liste des annees_etudes
});


// ====================================
// 🏆 Gestion des annes_universitaires 
// ====================================
Route::prefix('anneesUnivs')->group(function () {
    Route::get('/', [AnneeUnivController::class, 'index'])->name('annees_universitaire.index'); // Obtenir la liste des universitaires
});

// ====================================
// 🏆 Gestion des Filieres
// ====================================
Route::prefix('filieres')->group(function () {
    Route::get('/', [FiliereController::class, 'index'])->name('filieres.index'); // Obtenir la liste des annees_etudes
});

// ====================================
// 🏆 Gestion des etablissements
// ====================================
Route::prefix('etablissements')->group(function () {
    Route::get('/', [EtablissementController::class, 'index'])->name('etablissements.index'); // Obtenir la liste des annees_etudes
});

// ====================================
// 🏆 Gestion des typeEvaluations
// ====================================
Route::prefix('typeEvaluation')->group(function () {
    Route::get('/', [TypeEvaluationController::class, 'index'])->name('types_evaluation.index'); // Obtenir la liste des annees_etudes
});

// ====================================
// ⚙️ Routes Authentification (Middleware)
// ====================================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::post('/login', [AuthController::class, 'store']);
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
