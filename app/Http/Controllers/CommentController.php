<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use App\Models\PermissionGroup;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Http;

class CommentController extends Controller
{
    public function __construct()
    {
        return [];
    }

    public function index(Request $request)
    {

        return inertia('comments/index');
    }
}
