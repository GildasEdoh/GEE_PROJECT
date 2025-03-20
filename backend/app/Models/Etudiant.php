<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Etudiant
{
    // Definition des attributs
    private $id;
    private $numero_carte;
    private $nom;
    private $prenoms;
    private $sexe;
    private $dateNaissance;
    private $lieuNaissance;
    private $sexe;
    private $moyenne;
    private $rang;
    private $notes;

    // Constructeur sans argument
    public function __construct() {

    }

    // Getteurs
    public function getId() {
        return $this->id;
    }

    public function getNumCarte() {
        return $this->numero_carte;
    }

    public function getNom() {
        return $this->nom;
    }

    public function getDateNais() {
        return $this->dateNaissance;
    }

    public function getLieuNais() {
        return $this->lieuNaissance;
    }

    public function getSexe() {
        return $this->sexe;
    }

    public function getRang() {
        return $this->rang;
    }

    // Setteurs

    public function setNom($nom_) {
        $this->nom = $nom_;
    }
    public function setPrenom($prenoms_) {
        $this->prenoms = $prenoms_;
    }
    public function setSexe($sexe_) {
        return $this->sexe = $sexe_;
    }
    public function setLieuNais() {
        return $this->id;
    }
}