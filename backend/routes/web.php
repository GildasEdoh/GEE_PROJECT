<?php

<<<<<<< HEAD

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\CoefficientController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\InscriptionController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\DB;
=======
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EtudiantController;
/*
|--------------------------------------------------------------------------
| Routes Web
|--------------------------------------------------------------------------
*/
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;

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
>>>>>>> 0596282fbb784962250ece5c67f74f9089e69b68

// ====================================
// 🔍 Gestion des Étudiants
// ====================================
Route::prefix('etudiant')->group(function () {
    Route::get('/', [EtudiantController::class, 'index'])->name('etudiant.index'); // Obtenir la liste des etudiant
    Route::post('/', [EtudiantController::class, 'store'])->name('etudiants.store'); // Enregistrer
    Route::get('/{id}', [EtudiantController::class, 'show'])->name('etudiants.show');       // Afficher un étudiant
    Route::put('/{id}', [EtudiantController::class, 'update'])->name('etudiants.update');   // Mettre à jour
    Route::delete('/{id}', [EtudiantController::class, 'destroy'])->name('etudiants.destroy'); // Supprimer
});

// ====================================
// ⚙️ Gestion des Coefficients
// ====================================
Route::prefix('coefficient')->group(function () {
    Route::get('/', [CoefficientController::class, 'index'])->name('coefficient.index'); // Obtenir la liste des coefficients
    Route::post('/', [CoefficientController::class, 'store'])->name('coefficient.store'); // Enregistrer un coefficient
    Route::get('/{id}', [CoefficientController::class, 'show'])->name('coefficient.show'); // Afficher un coefficient spécifique
    Route::put('/{id}', [CoefficientController::class, 'update'])->name('coefficient.update'); // Mettre à jour un coefficient
    Route::delete('/{id}', [CoefficientController::class, 'destroy'])->name('coefficient.destroy'); // Supprimer un coefficient
});

// ====================================
// 📅 Gestion des Sessions
// ====================================
Route::prefix('session')->group(function () {
    Route::get('/', [SessionController::class, 'index'])->name('session.index');
    Route::post('/', [SessionController::class, 'store'])->name('session.store');
    Route::get('/{id}', [SessionController::class, 'show'])->name('session.show');
    Route::put('/{id}', [SessionController::class, 'update'])->name('session.update');
    Route::delete('/{id}', [SessionController::class, 'destroy'])->name('session.destroy');
});

// ====================================
// 📝 Gestion des Évaluations
// ====================================
Route::prefix('evaluation')->group(function () {
    Route::get('/', [EvaluationController::class, 'index'])->name('evaluation.index');
    Route::post('/', [EvaluationController::class, 'store'])->name('evaluation.store');
    Route::get('/{id}', [EvaluationController::class, 'show'])->name('evaluation.show');
    Route::put('/{id}', [EvaluationController::class, 'update'])->name('evaluation.update');
    Route::delete('/{id}', [EvaluationController::class, 'destroy'])->name('evaluation.destroy');
});

// ====================================
// 📚 Gestion des Matières
// ====================================
Route::prefix('matiere')->group(function () {
    Route::get('/', [MatiereController::class, 'index'])->name('matiere.index');
    Route::post('/', [MatiereController::class, 'store'])->name('matiere.store');
    Route::get('/{id}', [MatiereController::class, 'show'])->name('matiere.show');
    Route::put('/{id}', [MatiereController::class, 'update'])->name('matiere.update');
    Route::delete('/{id}', [MatiereController::class, 'destroy'])->name('matiere.destroy');
});

// ====================================
// 🏫 Gestion des Inscriptions
// ====================================
Route::prefix('inscription')->group(function () {
    Route::get('/', [InscriptionController::class, 'index'])->name('inscription.index');
    Route::post('/', [InscriptionController::class, 'store'])->name('inscription.store');
    Route::get('/{id}', [InscriptionController::class, 'show'])->name('inscription.show');
    Route::put('/{id}', [InscriptionController::class, 'update'])->name('inscription.update');
    Route::delete('/{id}', [InscriptionController::class, 'destroy'])->name('inscription.destroy');
});

// ====================================
// 🏆 Gestion des Notes
// ====================================
Route::prefix('note')->group(function () {
    Route::get('/', [NoteController::class, 'index'])->name('note.index'); // Obtenir la liste des notes
    Route::post('/', [NoteController::class, 'store'])->name('note.store'); // Enregistrer une note
    Route::get('/{id}', [NoteController::class, 'show'])->name('note.show'); // Afficher une note spécifique
    Route::put('/{id}', [NoteController::class, 'update'])->name('note.update'); // Mettre à jour une note
    Route::delete('/{id}', [NoteController::class, 'destroy'])->name('note.destroy'); // Supprimer une note
});

// ====================================
// ⚙️ Routes Authentification (Middleware)
// ====================================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

<<<<<<< HEAD
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
=======
Route::post('/login', [AuthController::class, 'store']);


Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
>>>>>>> 0596282fbb784962250ece5c67f74f9089e69b68
