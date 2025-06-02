<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parcours extends Model
{
    use HasFactory;

    protected $table = 'parcours';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'fk_filiere',
    ];

    // Relations
    public function filiere()
    {
        return $this->belongsTo(Filiere::class, 'fk_filiere');
    }

    public function parcoursAnneesEtudes()
    {
        return $this->hasMany(ParcoursAnneesEtude::class, 'fk_parcours');
    }
}
