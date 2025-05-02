<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EvaluationMatiereType extends Model
{
    use HasFactory;
    //
    protected $table = 'evaluations_matieres_types';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'fk_evaluation_matiere',
        'fk_type_evaluation',
        'poids'
    ];
    
    // Relation avec evaluation
    public function evaluationMatiere()
    {
        return $this->belongsTo(EvaluationMatiere::class, 'fk_evaluation_matiere');
    }

    // Relation avec Session
    public function typeEvaluation()
    {
        return $this->belongsTo(TypeEvaluation::class, 'fk_type_evaluation');
    }
}
