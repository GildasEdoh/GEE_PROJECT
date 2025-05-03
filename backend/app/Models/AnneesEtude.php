<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnneesEtude extends Model
{
    use HasFactory;
    //
    protected $table = 'annees_etude';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'niveau',
    ];
}
