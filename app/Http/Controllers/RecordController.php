<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Traits\Json;
use Auth;
use App\Device;
use App\Record;
use JavaScript;

class RecordController extends Controller
{
    use Json;

    public function allByUser(){
        if(!Auth::check())
            return redirect('login');
        
        $devices = Device::where('user_id', Auth::id());
        $deviceIds = $devices->pluck('id');
        
        $records = Record::whereIn('device_id', $deviceIds)->get();
        
        JavaScript::put([
            'records' => $records
//            'user' => Auth::user()
        ]);
        
//        return $records;
        return view('record.by-user')->with(['user' => Auth::user()]);
    }
    
    public function all(){
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
//        return $records;
        return view('record.all');
    }

}
