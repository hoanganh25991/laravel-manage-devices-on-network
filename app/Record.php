<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Json;

class Record extends Model
{
    use Json;
    protected $guarded = ['id'];
    protected $hidden = ['updated_at'];


//    public function getCreatedAtAttribute($val){
//        return $this->timestamp($val);
//    }
}
