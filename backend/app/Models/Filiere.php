<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Filiere extends Model
{
    use HasFactory;
    //
    protected $table = 'filieres';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'libelle',
        'fk_etablissement',
    ];
    
    // Relation avec evaluation
    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class, 'fk_etablissement');
    }
}
