<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $table = 'evaluations';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'abreviation',
        'moyenneAdmissible',
        'cloture',
        'fk_session'
    ];

    public function session()
    {
        return $this->belongsTo(Session::class, 'fk_session');
    }

    public function matiere()
    {
        return $this->belongsTo(Matiere::class, 'fk_matiere');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'fk_evaluation');
    }
}
