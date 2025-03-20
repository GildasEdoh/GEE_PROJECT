<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasFactory;

    protected $table = 'Inscription';
    protected $primaryKey = 'id_inscription';
    public $timestamps = false;

    protected $fillable = [
        'annee',
        'etudiant_id',
        'session_id',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function session()
    {
        return $this->belongsTo(Session::class, 'session_id');
    }
}
