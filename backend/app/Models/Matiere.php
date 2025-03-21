<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    use HasFactory;

    protected $table = 'Matiere';
    protected $primaryKey = 'id_matiere';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'abreviation',
        'optionnelle',
    ];

    public function coefficients()
    {
        return $this->hasMany(Coefficient::class, 'matiere_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class, 'matiere_id');
    }
}
