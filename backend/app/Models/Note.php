<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $table = 'notes';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'valeur',
        'gele',
        'fk_evaluation_matiere_type',
        'fk_etudiant',
    ];

    public function evaluation()
    {
        return $this->belongsTo(EvaluationMatiereType::class, 'fk_evaluation_matiere_type');
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'fk_etudiant');
    }
}