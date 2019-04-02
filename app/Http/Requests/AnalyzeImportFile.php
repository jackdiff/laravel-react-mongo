<?php

namespace App\Http\Requests;

class AnalyzeImportFile extends AppBaseRequest
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
            'file' => 'required|mimes:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
    }

    public function messages() {
        return [
            'file.required' => 'Không có file được chọn',
            'file.mimes'  => 'Không phải là file excel',
        ];
    }
}
