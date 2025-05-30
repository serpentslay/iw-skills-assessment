<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Returns the users based on get inputs
     * page: Current page number
     *
     * perPage: Items per page
     *
     * search: Search term
     *
     * sort: Sort column
     *
     * direction: Sort direction (asc or desc)
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function getUsers(Request $request)
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


        $users = $query->paginate($perPage);
        return $users;
    }
}
