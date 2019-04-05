<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Customer extends Eloquent {
    protected $collection = 'customers';

}