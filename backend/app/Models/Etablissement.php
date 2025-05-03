<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{
    //
    protected $table = 'etablissements';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nom_universite',
        'libelle',
        'boite_postale',
        'adresse',
        'titre_responsable',
        'nom_responsable'
    ];
}
