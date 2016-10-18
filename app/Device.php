<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $guarded = ['id'];
    
    public function records(){
        return $this->hasMany(Record::class, 'device_id', 'id');
    }
}
