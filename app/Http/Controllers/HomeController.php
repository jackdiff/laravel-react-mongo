<?php

namespace App\Http\Controllers;

use App\ServiceInterfaces\CustomerServiceInterface;
use App\Customer;

class HomeController extends Controller
{
    public function __construct(CustomerServiceInterface $customerService) {
        $this->customerService = $customerService;
    }

    public function index() {
        $fields = $this->customerService->getFields();
        $fieldStyles = $this->customerService->getFieldStyles();
        return view('welcome', compact('fields', 'fieldStyles'));
    }

    public function customers() {
      $data = Customer::paginate(25);
      return response()->json([
          'success' => true,
          'customer' => $data,
      ]);
    }
}
