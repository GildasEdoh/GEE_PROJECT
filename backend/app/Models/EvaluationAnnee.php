<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluationAnnee extends Model
{
    use HasFactory;
    //
    protected $table = 'evaluation_annee';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'fk_evaluation',
        'fk_session_annee',
        'cloture'
    ];
    
    // Relation avec evaluation
    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class, 'fk_evaluation');
    }

    // Relation avec SessionAnnee
    public function sessionAnnee()
    {
        return $this->belongsTo(SessionAnnee::class, 'fk_session_annee');
    }
}
