<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coefficient extends Model
{
    use HasFactory;

    protected $table = 'Coefficients';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'session_id',
        'matiere_id',
        'coef',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class, 'fk_session');
    }

    public function matiere()
    {
        return $this->belongsTo(Matiere::class, 'fk_matiere');
    }
}
