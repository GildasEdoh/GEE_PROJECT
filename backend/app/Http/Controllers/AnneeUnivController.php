<?php

namespace App\Http\Controllers;

use App\Models\AnneeUniv;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnneeUnivController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $anneesUnivs = AnneeUniv::all();
        return response()->json($anneesUnivs);
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
    public function show(AnneeUniv $anneeUniv)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AnneeUniv $anneeUniv)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AnneeUniv $anneeUniv)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AnneeUniv $anneeUniv)
    {
        //
    }
}
