<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $table = 'Etudiant';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'prenom',
        'dateNaissance',
        'lieuNaissance',
        'numero_carte',
        'sexe',
        'notes',
        'moyenne',
        'rang',
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'etudiant_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'etudiant_id');
    }
}
