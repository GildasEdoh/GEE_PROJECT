<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EtudiantController;
/*
|--------------------------------------------------------------------------
| Routes Web
|--------------------------------------------------------------------------
*/

// Route principale
Route::get('/', function () {

    return view('welcome');
});
=======
    return Inertia::render('welcome');
Route::get('/test-db-connection', function () {
    try {
        DB::connection()->getPdo();
        return 'Database connection successful!';
        return 'Could not connect to the database. Please check your configuration. Error: ' . $e->getMessage();
    }
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

require __DIR__.'/auth.php';
=======
// ====================================
// 🔍 Gestion des Étudiants
// ====================================
Route::prefix('etudiant')->group(function() {
    Route::get('/', [EtudiantController::class, 'index'])->name('etudiant.index'); // Obtenir la liste des etudiant
    Route::post('/', [EtudiantController::class, 'store'])->name('etudiants.store'); // Enregistrer
    Route::get('/{id}', [EtudiantController::class, 'show'])->name('etudiants.show');       // Afficher un étudiant
    Route::put('/{id}', [EtudiantController::class, 'update'])->name('etudiants.update');   // Mettre à jour
    Route::delete('/{id}', [EtudiantController::class, 'destroy'])->name('etudiants.destroy'); // Supprimer
});

// ====================================
// ⚙️ Gestion des Coefficients
// ====================================

// ====================================
// 🏫 Gestion des Sessions
// ====================================

// ====================================
// 🏫 Gestion des Evaluation
// ====================================

// ====================================
// 🏫 Gestion des Inscriptions
// ====================================

// ====================================
// 🏫 Gestion des Matieres
// ====================================

// ====================================
// 🏫 Gestion des Notes
// ====================================

// ====================================
// ⚙️ Routes Authentification (Middleware)
// ====================================
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

