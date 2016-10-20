<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JavaScript;
use Auth;
use App\Record;
use App\Device;

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

        if(!Auth::check())
            return redirect('login');

        $devices = Device::where('user_id', Auth::id());
        $deviceIds = $devices->pluck('id');

        $records = Record::whereIn('device_id', $deviceIds)->get();

        JavaScript::put([
            'records' => $records
        ]);

        return view('home');
    }
}
