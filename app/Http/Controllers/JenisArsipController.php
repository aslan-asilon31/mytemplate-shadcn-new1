<?php

namespace App\Http\Controllers;

use App\Models\Arsip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JenisArsipController extends Controller
{
    // Show the list of arsip
    public function index(Request $request)
    {
        // Search functionality for 'kode' and 'nama'
        $arsips = Arsip::query()
            ->when(
                $request->search,
                fn($query) => $query->where('kode', 'like', '%' . $request->search . '%')
                    ->orWhere('nama', 'like', '%' . $request->search . '%')
            )
            ->latest()
            ->paginate(10)
            ->withQueryString();
        $userPermissions = \Illuminate\Support\Facades\Auth::user()->getAllPermissions()->pluck('name')->toArray();

        return Inertia::render('arsip/index', [
            'arsips' => $arsips,
            'userPermissions' => $userPermissions,
            'filters' => $request->only('search'),
        ]);
    }

    // Show the form for creating a new arsip
    public function create()
    {
        return Inertia::render('arsip/create');
    }

    // Store a new arsip in the database
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode' => 'required|string|max:255',
            'nama' => 'nullable|string|max:255',
            'status' => 'nullable|integer',
        ]);

        Arsip::create($validated);

        return redirect()->route('arsip.index')->with('success', 'Arsip created successfully.');
    }

    // Show the form for editing the specified arsip
    public function edit(Arsip $arsip)
    {
        return Inertia::render('Arsip/Edit', [
            'arsip' => $arsip
        ]);
    }

    // Update the specified arsip in the database
    public function update(Request $request, Arsip $arsip)
    {
        $validated = $request->validate([
            'kode' => 'required|string|max:255',
            'nama' => 'nullable|string|max:255',
            'status' => 'nullable|integer',
        ]);

        $arsip->update($validated);

        return redirect()->route('arsip.index')->with('success', 'Arsip updated successfully.');
    }

    // Delete the specified arsip
    public function destroy(Arsip $arsip)
    {
        $arsip->delete();

        return back()->with('success', 'Arsip deleted successfully.');
    }
}
