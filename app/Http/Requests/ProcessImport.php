<?php

namespace App\Http\Requests;

class ProcessImport extends AppBaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'fileImport' => 'required|mimexls',
            'category' => 'required|max:255',
            'fields' => 'required'
        ];
    }

    public function messages() {
        return [
            'fileImport.required' => __('Không có file được chọn'),
            'fileImport.mimexls'  => __('Không phải là file excel'),
            'category.required' => __('Danh mục không được trống'),
            'category.max' => __('Danh mục không được quá 255 kí tự'),
            'fields.required' => __('Bạn chưa chọn các trường cho dữ liệu import'),
        ];
    }
}
