<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $table = 'Note';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'valeur',
        'gele',
        'evaluation_id',
        'etudiant_id',
    ];

    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class, 'evaluation_id');
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }
}