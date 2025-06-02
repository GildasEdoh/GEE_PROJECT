<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnneeUniv extends Model
{
    use HasFactory;
    //
    protected $table = 'annees_universitaire';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'annee_univ',
    ];
}
