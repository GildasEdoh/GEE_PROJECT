<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $table = 'Session';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'nbcompose', 
        'cloture',
    ];

    public function coefficients()
    {
        return $this->hasMany(Coefficient::class, 'session_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class, 'session_id');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'session_id');
    }
}
