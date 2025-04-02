<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTypeDetailsTable extends Migration
{
    public function up()
    {
        Schema::create('type_details', function (Blueprint $table) {
            $table->id();
            $table->string('libelle', 100)->nullable();
            $table->string('abreviation', 50)->nullable();
            $table->double('poids')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('type_details');
    }
};
