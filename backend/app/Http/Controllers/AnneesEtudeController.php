<?php

namespace App\Http\Controllers;

use App\Models\AnneesEtude;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnneesEtudeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $anneesEtude = AnneesEtude::all();
        return response()->json($anneesEtude);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AnneesEtude $anneesEtude)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AnneesEtude $anneesEtude)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnneesEtude $anneesEtude)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnneesEtude $anneesEtude)
    {
        //
    }
}
