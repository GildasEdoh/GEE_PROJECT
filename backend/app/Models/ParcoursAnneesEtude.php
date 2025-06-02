<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParcoursAnneesEtude extends Model
{
    use HasFactory;

    protected $table = 'parcours_annees_etude'; // nom exact de la table
    protected $primaryKey = 'id'; // clé primaire
    public $timestamps = false; // si created_at et updated_at n'existent pas

    protected $fillable = [
        'fk_parcours',
        'fk_annee_etude',
    ];

    // Relations
    public function parcours()
    {
        return $this->belongsTo(Parcours::class, 'fk_parcours');
    }

    public function anneeEtude()
    {
        return $this->belongsTo(AnneeEtude::class, 'fk_annee_etude');
    }
}
