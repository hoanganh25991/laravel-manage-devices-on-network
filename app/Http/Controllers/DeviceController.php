<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Traits\Json;
use DB;
use App\Device;

class DeviceController extends Controller
{
    use Json;

    public function update(Request $req){
        $data = $req->get('data');
        $data = collect(json_decode($data, true));

        $data->each(function($val){
            $device = Device::where('mac', $val['mac'])->first();
            if(empty($device))
                $device = new Device($val);

            $device->save();
        });

        return response(['msg'=>'success'], 200, $this->jsonHeader());
    }
}
