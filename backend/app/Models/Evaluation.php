<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Evaluation
{
    // Definition des attributs
    private $id;
    private $libelle;
    private $description;
    private $moyenneAdmissible;
    private $coture;

    public function __construct() {

    }
}