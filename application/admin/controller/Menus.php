<?php

namespace app\admin\controller;

use think\Request;
use app\common\model\Menu;
use helper\Recursion;

class Menus extends Base
{
    /**
     * 显示资源列表
     *
     * @return \think\Response
     */
    public function index()
    {
        $data = Menu::order('sort', 'asc')->all();
        $nodes = json_encode(Recursion::buildTree($data));
        $data = json_encode($data);
        return $this->fetch('menus/index', compact('nodes', 'data'));
    }

    /**
     * 显示创建资源表单页.
     *
     * @return \think\Response
     */
    public function create()
    {
        //
    }

    /**
     * 保存新建的资源
     *
     * @param  \think\Request  $request
     * @return \think\Response
     */
    public function save(Request $request)
    {
        $node = $request->param();
        $result = $this->validate($node, 'app\admin\validate\Menu');
        if (true !== $result) {
            return $result;
        }
        $menu = Menu::create($node);
        return $menu->id;
    }

    /**
     * 显示指定的资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function read($id)
    {
        //
    }

    /**
     * 显示编辑资源表单页.
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * 保存更新的资源
     *
     * @param  \think\Request  $request
     * @param  int  $id
     * @return \think\Response
     */
    public function update(Request $request, $id)
    {
        $node = $request->param();
        $result = $this->validate($node, 'app\admin\validate\Menu');
        if (true !== $result) {
            return $result;
        }

        $menu = new Menu;
        return $menu->allowField(true)->save($node, ['id' => $id]);
    }

    /**
     * 删除指定资源
     *
     * @param  int  $id
     * @return \think\Response
     */
    public function delete($id)
    {
//        return (new Menu)->deleteNode($id);
    }
}
