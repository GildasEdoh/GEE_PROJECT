<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeDetails extends Model
{
    use HasFactory;

    protected $table = 'TypeDetails';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'abreviation',
        'poids',
    ];
}
