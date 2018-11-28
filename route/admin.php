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

//    菜单
    Route::resource('menus', 'admin/menus')->only([
        'index', 'save', 'update', 'delete'
    ]);

//    规则
    Route::resource('rules', 'admin/rules')->only([
        'index', 'save', 'update', 'delete'
    ]);

//    管理员
    Route::resource('admins', 'admin/admins');
});