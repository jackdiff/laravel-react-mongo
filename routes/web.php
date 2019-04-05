<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');

Route::get('/import', 'HomeController@index');

Route::get('/category', 'HomeController@index');

Route::post('/category/add', 'CategoryController@add');
Route::get('/categories', 'CategoryController@index');
Route::post('/category/remove/{id}', 'CategoryController@remove');

Route::post('/import/analyze', 'ImportController@analyze');