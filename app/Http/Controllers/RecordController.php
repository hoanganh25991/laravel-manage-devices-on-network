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
        ]);
        
        return $records;
    }

}
