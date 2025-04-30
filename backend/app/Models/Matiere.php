<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    use HasFactory;

    protected $table = 'matieres';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'abreviation',
        'optionnelle',
    ];

    public function coefficients()
    {
        return $this->hasMany(Coefficient::class, 'fk_matiere');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class, 'fk_matiere');
    }
}
