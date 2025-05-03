<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EvaluationMatiere extends Model
{
    use HasFactory;
    //
    protected $table = 'evaluations_matieres';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'fk_evaluation',
        'fk_session',
        'fk_matiere',
        'fk_annee_univ'
    ];
    
    // Relation avec evaluation
    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class, 'fk_evaluation');
    }

    // Relation avec Session
    public function session()
    {
        return $this->belongsTo(Session::class, 'fk_session');
    }

    // Relation avec matiere
    public function matiere()
    {
        return $this->belongsTo(Matiere::class, 'fk_matiere');
    }

    public function anneeUniv()
    {
        return $this->belongsTo(AnneeUniv::class, 'fk_annee_univ');
    }
}
