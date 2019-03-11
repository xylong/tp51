<?php
/**
 * Created by PhpStorm.
 * User: xuyunlong
 * Date: 2019/3/11
 * Time: 10:19 PM
 */

Route::group('api/:version', function () {
    Route::any('test', 'api/:version.test/index');
});