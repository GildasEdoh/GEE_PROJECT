<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasFactory;

    protected $table = 'inscriptions';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'fk_annee_univ',
        'fk_etudiant',
        'fk_parcours_annee_etude',
    ];

    // 
    public function anneeUniv()
    {
        return $this->belongsTo(AnneeUniv::class, 'fk_annee_univ');
    }

    // 
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'fk_etudiant');
    }

    // 
    public function parcoursAnneeEtude()
    {
        return $this->belongsTo(ParcoursAnneesEtude::class, 'fk_parcours_annee_etude');
    }
}
