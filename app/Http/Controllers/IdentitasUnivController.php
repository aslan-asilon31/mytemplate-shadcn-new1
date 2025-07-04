<?php

namespace App\Http\Controllers;

use App\Models\IdentitasUniversitas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IdentitasUnivController extends Controller
{
    // Display the list of records with a filter
    public function index(Request $request)
    {

        $identitasUniversitas = IdentitasUniversitas::query()
            ->when($request->search, function ($query, $search) {
                return $query->where('id', 'like', "%$search%")
                    ->orWhere('univ_identitas_id', 'like', "%$search%");
            })
            ->paginate(10)
            ->withQueryString();
        $userPermissions = \Illuminate\Support\Facades\Auth::user()->getAllPermissions()->pluck('name')->toArray();

        return Inertia::render('identitasUniversitas/index', [
            'identitasUniversitas' => $identitasUniversitas,
            'filters' => $request->only('search'),
            'userPermissions' => $userPermissions,

        ]);
    }

    // Show the form for creating a new record
    public function create()
    {
        return Inertia::render('IdentitasUniversitas/Create');
    }

    // Store a newly created record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'univ_identitas_id' => 'required|exists:konfig_universitas,id',
            'sistem_univ_id' => 'required|exists:konfig_sistem,id',
            'email_univ_id' => 'required|exists:konfig_email,id',
            'google_captcha_univ_id' => 'required|exists:konfig_google_captcha,id',
            'config_univ_id' => 'required|exists:konfig_universitas,id',
            'wa_gateway_univ_id' => 'required|exists:konfig_wa_gateway,id',
            'payment_gateway_univ_id' => 'required|exists:konfig_payment_gateway,id',
            'info_univ_id' => 'required|exists:konfig_universitas,id',
        ]);

        IdentitasUniversitas::create($validated);

        return redirect()->route('identitas-universitas.index')->with('success', 'Identitas Universitas created successfully.');
    }

    // Show the form for editing the specified record
    public function edit(IdentitasUniversitas $identitasUniversitas)
    {
        return Inertia::render('IdentitasUniversitas/Edit', [
            'identitasUniversitas' => $identitasUniversitas,
        ]);
    }

    // Update the specified record
    public function update(Request $request, IdentitasUniversitas $identitasUniversitas)
    {
        $validated = $request->validate([
            'univ_identitas_id' => 'required|exists:konfig_universitas,id',
            'sistem_univ_id' => 'required|exists:konfig_sistem,id',
            'email_univ_id' => 'required|exists:konfig_email,id',
            'google_captcha_univ_id' => 'required|exists:konfig_google_captcha,id',
            'config_univ_id' => 'required|exists:konfig_universitas,id',
            'wa_gateway_univ_id' => 'required|exists:konfig_wa_gateway,id',
            'payment_gateway_univ_id' => 'required|exists:konfig_payment_gateway,id',
            'info_univ_id' => 'required|exists:konfig_universitas,id',
        ]);

        $identitasUniversitas->update($validated);

        return redirect()->route('identitas-universitas.index')->with('success', 'Identitas Universitas updated successfully.');
    }

    // Remove the specified record
    public function destroy(IdentitasUniversitas $identitasUniversitas)
    {
        $identitasUniversitas->delete();

        return redirect()->route('identitas-universitas.index')->with('success', 'Identitas Universitas deleted successfully.');
    }
}
