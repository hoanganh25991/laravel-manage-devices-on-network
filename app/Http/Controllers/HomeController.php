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
        //load all user with devices
        $usersWithDevices = User::with(['devices' => function($device){
            $device->whereHas('records', function($record){
                $record->onLine();
            });
        }])->get();

        JavaScript::put([
            'users' => $usersWithDevices
        ]);

        //load all record related to USER
        if(!Auth::check())
            return redirect('login');

//        $devices = Device::where('user_id', Auth::id());
//        $deviceIds = $devices->pluck('id');
//
//        $records = Record::whereIn('device_id', $deviceIds)->get();
        $records = Record::with(['device' => function($device){
            //only load DEVICE has user_id
            //means belongs to someone
            $device->where('user_id', '!=', null);
        }])->thisMonth()->get();

        $records = $records->filter(function($record){
            return !empty($record->device);
        });

        //transform
        $records->each(function($record){
            $record->user_id =  $record->device->user_id;
        });
        JavaScript::put([
            'records' => $records->values()
        ]);


        return view('home');
    }
}
