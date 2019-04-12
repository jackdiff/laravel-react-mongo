<?php
namespace App\ServiceInterfaces;

interface CustomerServiceInterface
{
    public function getFields();
    public function getFieldStyles();
    public function import($file, $category, $fields);
}
