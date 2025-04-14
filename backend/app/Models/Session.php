<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $table = 'sessions';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'nbcompose', 
        'cloture',
    ];

    public function coefficients()
    {
        return $this->hasMany(Coefficient::class, 'fk_session');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class, 'fk_session');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'fk_session');
    }
}
