<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getPaginatedUsers(Request $request)
    {

        $perPage = $request->get('perPage', '');
        $search = $request->get('search', '');
        $order = $request->get('sort', '');
        $direction = $request->get('direction', '');

        $query = User::query();


        if (!empty($search)) {
            $query->where('name', 'ILIKE', "%{$search}%")
                ->orWhere('email', 'ILIKE', "%{$search}%")
                ->orWhere('id', 'ILIKE', "%{$search}%");
        }

        if(!empty($order)){
            $query->orderBy("{$order}", "{$direction}");
        }

        // Paginate the users
        $users = $query->paginate($perPage);
        return $users; // Return paginated users
    }
}
