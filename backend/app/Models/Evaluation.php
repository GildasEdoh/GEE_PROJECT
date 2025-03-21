<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $table = 'Evaluation';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'abreviation',
        'moyenneAdmissible',
        'cloture',
        'session_id',
        'matiere_id',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class, 'session_id');
    }

    public function matiere()
    {
        return $this->belongsTo(Matiere::class, 'matiere_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class, 'evaluation_id');
    }
}
