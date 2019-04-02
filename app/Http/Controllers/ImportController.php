<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnalyzeImportFile;

class ImportController extends Controller
{
    public function analyze(AnalyzeImportFile $request) {
        dd(111);
    }
}
