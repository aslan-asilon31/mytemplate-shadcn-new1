<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{

    public function index(Request $request)
    {

        $userPermissions = \Illuminate\Support\Facades\Auth::user()->getAllPermissions()->pluck('name')->toArray();

        return Inertia::render('dashboard', [
            'userPermissions' => $userPermissions,
        ]);
    }

}
