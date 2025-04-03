<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtudiantTable extends Migration
{
    public function up()
    {
        Schema::create('etudiant', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 100)->nullable();
            $table->string('prenom', 100)->nullable();
            $table->date('dateNaissance')->nullable();
            $table->string('lieuNaissance', 255)->nullable();
            $table->integer('numero_carte')->unique()->nullable();
            $table->enum('sexe', ['M', 'F'])->nullable();
            $table->double('notes')->nullable();
            $table->double('moyenne')->nullable();
            $table->integer('rang')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('etudiant');
    }
};
