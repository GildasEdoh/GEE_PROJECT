<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $table = 'etudiants';
    protected $primaryKey = 'numero_carte';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'prenom',
        'dateNaissance',
        'lieuNaissance',
        'sexe'
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'fk_etudiant');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'fk_etudiant');
    }
}
