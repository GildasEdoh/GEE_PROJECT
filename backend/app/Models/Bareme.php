<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bareme extends Model
{
    use HasFactory;

    protected $table = 'Bareme';
    protected $primaryKey = 'id';
    public $timestamps = false; // Si vous n'avez pas de colonnes created_at et updated_at

    protected $fillable = [
        'mention',
        'abreviation',
        'moyenne',
    ];
}
