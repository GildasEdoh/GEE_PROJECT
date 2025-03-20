<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Session
{
    private $id;
    private $libelle;
    private $nbreCompose;
    private $cloture;

    public function __construct() {
        
    }
}
