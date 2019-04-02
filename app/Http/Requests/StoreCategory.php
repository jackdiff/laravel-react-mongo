<?php

namespace App\Http\Requests;

class StoreCategory extends AppBaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:200'
        ];
    }

    public function messages() {
        return [
        'name.required' => 'Tên danh mục không được trống',
        'name.max'  => 'Tên danh mục không được quá 200 kí tự',
    ];
    }
}
