<?php
/**
 * Created by PhpStorm.
 * User: xuyunlong
 * Date: 2018/11/11
 * Time: 9:20 AM
 */


Route::group('admin', function () {

//    首页
    Route::get('/', 'Admin/index/index');

    // 菜单
    Route::resource('menus', 'admin/menus');

});