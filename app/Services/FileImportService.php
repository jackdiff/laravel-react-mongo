<?php

namespace App\Services;

use App\ServiceInterfaces\FileImportServiceInterface;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

class FileImportService implements FileImportServiceInterface
{
    public function makeFormat($file, $fields) {
        $reader = new Xlsx();
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
        $worksheets = $spreadsheet->getAllSheets();

        $format = [];
        foreach($worksheets as $ws) {
            $count = 0;
            $structure = [];
            foreach ($ws->getRowIterator() as $row) {
                
                $cellIterator = $row->getCellIterator();
                $cellIterator->setIterateOnlyExistingCells(FALSE);
                $line = [];
                $isEmpty = true;
                foreach ($cellIterator as $cell) {
                    if($isEmpty && !empty($cell->getValue())) {
                        $isEmpty = false;
                    }
                    if(!empty($cell->getValue())) {
                        $line[] = (string)$cell->getValue();
                    }
                }
                if(!$isEmpty) {
                    $structure[] = $line;
                    if(++$count >= 2) {
                        break;
                    }
                }
            }

            if(!empty($structure)) {
                //map default field with header
                $header = array_keys($fields);
                if(count($header) < count($structure[0])) {
                    for ($i = 0, $n=count($structure[0]) - count($header); $i < $n; $i++) {
                        array_push($header, '');
                    }
                }
                $format[$ws->getTitle()] = [
                    'header' => $header,
                    'structure' => $structure
                ];
            }
        }
        return $format;
    }
}
