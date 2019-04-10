<?php
namespace App\Http\Controllers;

use App\Http\Requests\AnalyzeImport;
use App\Http\Requests\ProcessImport;
use App\ServiceInterfaces\FileImportServiceInterface;
use App\ServiceInterfaces\CustomerServiceInterface;

class ImportController extends Controller
{
    public function __construct(FileImportServiceInterface $fileService, CustomerServiceInterface $customerService) {
        $this->fileService = $fileService;
        $this->customerService = $customerService;
    }

    public function analyze(AnalyzeImport $request) {
        $format = $this->fileService->makeFormat($request->file('fileImport'), $this->customerService->getFields());
        if(empty($format)) {
            return response()->json([
                'success' => false,
                'errors' => ['fileImport' => 'File empty'] 
            ], 422);
        }
        return response()->json([
                'success' => true,
                'format' => $format
            ]);
    }

    public function process(ProcessImport $request) {
        
    }
}
