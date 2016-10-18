<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Json;
use Carbon\Carbon;

class Record extends Model
{
    use Json;
    protected $guarded = ['id'];
    protected $hidden = ['updated_at'];


//    public function getCreatedAtAttribute($val){
//        return $this->timestamp($val);
//    }

    public function scopeOnLine($query){
        //with five minute internal update
        //online means that USER has RECORD less than five minute ago
        return $query->where('created_at', '>=', Carbon::now()->subMinutes(5));
    }
}
