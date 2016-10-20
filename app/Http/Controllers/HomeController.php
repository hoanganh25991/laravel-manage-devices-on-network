<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JavaScript;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usersWithDevices = User::with(['devices' => function($device){
            $device->whereHas('records', function($record){
                $record->onLine();
            });
        }])->get();

        JavaScript::put([
            'users' => $usersWithDevices
        ]);

        return view('home');
    }
}
