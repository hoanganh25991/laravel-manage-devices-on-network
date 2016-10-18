<?php

namespace App\Traits;
use Carbon\Carbon;

trait Json{
    
    function jsonHeader(){
        return ['Content-Type' => 'application/json'];
    }
    
    function timestamp($value){
        if(!$value){
            return null;
        }
        $carbon = new Carbon($value);
        $unixTimestamp = $carbon->timestamp;
        return $unixTimestamp;
    }
    
}