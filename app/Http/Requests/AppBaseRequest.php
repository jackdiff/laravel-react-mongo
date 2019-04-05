<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class AppBaseRequest extends FormRequest
{
    public function failedValidation(Validator $validator)
    {
        $errorBag = $validator->errors()->messages();
        $errors = [];
        foreach ($errorBag as $key => $value) {
            $errors[$key] = @$value[0];
        }
        $data = [
            'success' => false,
            'errors' => $errors
        ];
        throw new HttpResponseException(response()->json($data)); 
    }
}
