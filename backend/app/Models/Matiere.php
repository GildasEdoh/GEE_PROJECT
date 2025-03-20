<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Matiere
{
    // Definition des attributs
    private $id;
    private $libelle;
    private $abreviation;
    private $optionnelle;

    public function __construct($libelle, $abreviation, $optionnelle) {
        $this->libelle = $libelle;
        $this->abreviation = $abreviation;
        $this->optionnelle = $optionnelle
    }
    
    public function _toString() {

    }
}