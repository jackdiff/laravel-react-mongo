<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppBaseRequest extends FormRequest
{
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors()->all(), 422)); 
    }
}
