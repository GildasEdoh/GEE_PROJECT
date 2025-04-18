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
        'fk_evaluation',
        'fk_etudiant',
    ];

    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class, 'fk_evaluation');
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'fk_etudiant');
    }
}