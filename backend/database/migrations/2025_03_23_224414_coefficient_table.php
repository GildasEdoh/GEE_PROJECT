<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoefficientTable extends Migration
{
    public function up()
    {
        Schema::create('coefficient', function (Blueprint $table) {
            $table->id();
            $table->foreignId('session_id')->constrained('sessions')->onDelete('cascade');
            $table->foreignId('matiere_id')->constrained('matieres')->onDelete('cascade');
            $table->integer('coef')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('coefficient');
    }
};
