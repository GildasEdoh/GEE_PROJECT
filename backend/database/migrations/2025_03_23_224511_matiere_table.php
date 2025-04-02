<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatiereTable extends Migration
{
    public function up()
    {
        Schema::create('matiere', function (Blueprint $table) {
            $table->id('id_matiere');
            $table->string('libelle', 100)->nullable();
            $table->string('abreviation', 50)->nullable();
            $table->boolean('optionnelle')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('matiere');
    }
};
