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
        'numero_carte',
        'nom',
        'prenom',
        'date_naissance',
        'lieu_naissance',
        'sexe',
        'id_etablissement',
        'Nationalite',
        'Tel_1',
        'Tel_2',
        'ville',
        'quartier',
        'rue'
    ];

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'fk_etudiant');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'fk_etudiant');
    }

    // Relation avec l'établissement (s'il existe une table Etablissements)
    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class, 'id_etablissement');
    }
}
