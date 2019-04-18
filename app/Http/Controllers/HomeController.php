<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function customers(Request $request) {
      $category = $request->query('category');
      $name = $request->query('name');
      $address = $request->query('address');
      $tel = $request->query('tel');

      $query = DB::collection('customers');
      if(!empty($category)) {
        $query->where('category_id', $category);
      }
      if(!empty($name)) {
        $query->where('name', 'like', "%$name%");
      }
      if(!empty($address)) {
        $query->where('address', 'like', "%$address%"); 
      }
      if(!empty($tel)) {
       $query->where('tel', 'like', "%$tel%");  
      }
      $data = $query->paginate(25);
      // $data = Customer::paginate(25);
      return response()->json([
          'success' => true,
          'customer' => $data,
      ]);
    }
}
