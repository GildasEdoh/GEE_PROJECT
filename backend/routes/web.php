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
use Illuminate\Support\Facades\DB;
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
        DB::connection()->getPdo();
        return 'Database connection successful!';
    } catch (\Exception $e) {
        return 'Could not connect to the database. Please check your configuration. Error: ' . $e->getMessage();
    }
});

use App\Http\Controllers\ProfileController;

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
// ⚙️ Routes Authentification (Middleware)
// ====================================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::post('/login', [AuthController::class, 'store']);


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
