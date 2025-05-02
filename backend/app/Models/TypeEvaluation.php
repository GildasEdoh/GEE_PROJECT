<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TypeEvaluation extends Model
{
    use HasFactory;

    protected $table = 'types_evaluation';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'abreviation'
    ];
}
