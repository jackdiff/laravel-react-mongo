<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use App\Services\FileImportService;
use App\ServiceInterfaces\FileImportServiceInterface;
use App\Services\CustomerService;
use App\ServiceInterfaces\CustomerServiceInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(
            FileImportServiceInterface::class,
            FileImportService::class
        );
        $this->app->singleton(
            CustomerServiceInterface::class,
            CustomerService::class
        );
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('mimexls', function ($attribute, $value, $parameters, $validator) {
            $allowed_mimes = [
                'application/vnd.ms-excel', // xls
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
            ];
            return in_array($value->getMimeType(), $allowed_mimes);
        });

    }
}
