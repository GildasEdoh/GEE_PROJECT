<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNoteTable extends Migration
{
    public function up()
    {
        Schema::create('note', function (Blueprint $table) {
            $table->id();
            $table->double('valeur')->nullable();
            $table->boolean('gele')->nullable();
            $table->foreignId('evaluation_id')->constrained('evaluation')->onDelete('cascade');
            $table->foreignId('etudiant_id')->constrained('etudiant')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('note');
    }
};
