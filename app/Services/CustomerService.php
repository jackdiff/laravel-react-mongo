<?php

namespace App\Services;

use App\ServiceInterfaces\CustomerServiceInterface;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;
use App\Customer;

class CustomerService implements CustomerServiceInterface
{
    public function getFields() {
        return [
            'no' => 'No.',
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

    public function getFieldStyles() {
        return [
            'no' => 'm50',
            'company' => 'm150',
            'address' => 'm250',
            'name' => 'm150',
            'tel' => 'm150',
            'mobile_tel' => 'm150',
            'position' => 'm150',
            'website' => 'm150',
            'city' => 'm150',
        ];
    }

    public function import($file, $category, $fields) {
        $reader = new Xlsx();
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
        $worksheets = $spreadsheet->getAllSheets();
        $toSave = [];
        foreach($worksheets as $ws) {
            $count = 0;
            $structure = [];
            $sheet = $ws->getTitle();
            $wsFields = @$fields[$sheet];
            if(empty($wsFields)) {
                continue;
            }
            foreach ($ws->getRowIterator() as $row) {
                $count++;
                if($count <= 1) {
                    //1st row is header
                    continue;
                }
                $cellIterator = $row->getCellIterator();
                $cellIterator->setIterateOnlyExistingCells(true);
                $line = [];
                $i = 0;
                foreach ($cellIterator as $cell) {
                    if(!empty(@$wsFields[$i])) {
                        $line[@$wsFields[$i]] = (string)$cell->getValue();
                    }
                    $i++;
                }
                if(!empty($line)) {
                    $line['category_id'] = $category->_id;
                    $line['sheet'] = $sheet;
                    array_push($toSave, $line);
                }
            }
        }
        if(!empty($toSave)) {
            //Customer::insert($toSave);
        }
    }
}
