<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coefficient extends Model
{
    use HasFactory;

    protected $table = 'Coefficient';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'session_id',
        'matiere_id',
        'coef',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class, 'session_id');
    }

    public function matiere()
    {
        return $this->belongsTo(Matiere::class, 'matiere_id');
    }
}
