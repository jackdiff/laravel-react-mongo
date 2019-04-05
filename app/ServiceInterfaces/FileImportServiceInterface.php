<?php
namespace App\ServiceInterfaces;

interface FileImportServiceInterface
{
    public function makeFormat($file, $fields);
}
