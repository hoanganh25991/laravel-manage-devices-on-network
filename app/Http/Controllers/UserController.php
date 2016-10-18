<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use JavaScript;
use App\User;

class UserController extends Controller
{
    public function allUserStatus(){
        $usersWithDevices = User::with(['devices' => function($device){
            $device->whereHas('records', function($record){
                $record->onLine();
            });
        }])->get();

        JavaScript::put([
            'users' => $usersWithDevices
        ]);

        return $usersWithDevices;
    }
}
