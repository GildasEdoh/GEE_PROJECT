<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParcoursAnneesEtudeMatiere extends Model
{
    use HasFactory;

    protected $table = 'parcours_annees_etude_matieres'; // nom exact de la table
    protected $primaryKey = 'id'; // clé primaire
    public $timestamps = false; // si created_at et updated_at n'existent pas

    protected $fillable = [
        'fk_parcours_annee_etude',
        'fk_matiere',
    ];

    // Relations
    public function matiere()
    {
        return $this->belongsTo(Parcours::class, 'fk_matiere');
    }

    public function parcoursAnneeEtude()
    {
        return $this->belongsTo(AnneesEtude::class, 'fk_parcours_annee_etude');
    }
}
