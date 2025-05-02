<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SessionAnnee extends Model
{
    use HasFactory;

    protected $table = 'session_annee';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'fk_session',
        'fk_annee_univ',
        'cloture',
    ];

    // Relation avec le modèle Session
    public function session()
    {
        return $this->belongsTo(Session::class, 'fk_session');
    }

    // Relation avec le modèle AnneeUniv
    public function anneeUniv()
    {
        return $this->belongsTo(AnneeUniv::class, 'fk_annee_univ');
    }

    // Relation avec le modèle EvaluationAnnee
    public function evaluationsAnnees()
    {
        return $this->hasMany(EvaluationAnnee::class, 'fk_session_annee');
    }
}
