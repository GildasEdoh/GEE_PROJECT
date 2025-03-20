<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Bareme
{
    private $id;
    private $mention;
    private $abreviation;
    private $moyenne;
    
    public function __construct() {
        
    }

}
