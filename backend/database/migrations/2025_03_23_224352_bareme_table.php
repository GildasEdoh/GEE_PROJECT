<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBaremeTable extends Migration
{
    public function up()
    {
        Schema::create('bareme', function (Blueprint $table) {
            $table->id(); // auto-increment for id
            $table->string('mention', 100)->nullable();
            $table->string('abreviation', 50)->nullable();
            $table->double('moyenne')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bareme');
    }
};
