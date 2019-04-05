<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategory;
use App\Category;

class CategoryController extends Controller
{
    public function index() {
      $cate = Category::all();
      return response()->json(['success' => true, 'categories' => $cate->toArray()]);
    }

    public function remove($id = null) {
      if(!$id) {
        return response()->json(['success' => false, 'errors' => ['common' => 'Err! Can not delete empty item']]);
      }
      $cate = Category::find($id);
      $cate->delete();
      return response()->json(['success' => true]);
    }

    public function add(StoreCategory $request) {
      $id = $request->get('id');
      $new = null;
      if($id) {
        $new = Category::find($id);
      }
      if(!$new) {
        $new = new Category;
      }
      $new->name = $request->get('name');
      try {
        $new->save();
        return response()->json(['success' => true, 'category' => $new->toArray()]);
      } catch(\Exception $e) {
        return response()->json(['success' => false, 'errors' => ['name' => 'Can not create new one right now.']]);
      }
    }
}
