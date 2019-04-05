<?php

namespace App\Services;

use App\ServiceInterfaces\CustomerServiceInterface;

class CustomerService implements CustomerServiceInterface
{
    public function getFields() {
        return [
            'no' => 'STT',
            'company' => 'Công ty',
            'address' => 'Địa chỉ',
            'name' => 'Tên',
            'tel' => 'SĐT',
            'mobile_tel' => 'Di động',
            'position' => 'Chức vụ',
            'website' => 'Địa chỉ Web',
            'city' => 'Tỉnh thành'
        ];
    }
}
