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
        return view('welcome', compact('fields'));
    }
}
