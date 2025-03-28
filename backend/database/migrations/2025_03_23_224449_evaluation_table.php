<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluationTable extends Migration
{
    public function up()
    {
        Schema::create('evaluation', function (Blueprint $table) {
            $table->id();
            $table->string('libelle', 100)->nullable();
            $table->string('abreviation', 50)->nullable();
            $table->double('moyenneAdmissible')->nullable();
            $table->tinyInteger('cloture')->nullable();
            $table->foreignId('session_id')->constrained('sessions')->onDelete('cascade');
            $table->foreignId('matiere_id')->constrained('matieres')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('evaluation');
    }
};
