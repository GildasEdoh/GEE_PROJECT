<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    use HasFactory;

    protected $table = 'inscriptions';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'annee',
        'fk_etudiant',
        'fk_session',
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'fk_etudiant');
    }

    public function session()
    {
        return $this->belongsTo(Session::class, 'fk_session');
    }
}
