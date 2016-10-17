<?php

namespace App\Traits;

trait Json{
    
    function jsonHeader(){
        return ['Content-Type' => 'application/json'];
    }
}