<?php

namespace app\admin\controller;

use app\common\model\Menu;
use helper\Recursion;
use think\Request;

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
     * 保存新建的资源
     *
     * @param  \think\Request $request
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
     * 保存更新的资源
     *
     * @param  \think\Request $request
     * @param  int $id
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
     * @param  int $id
     * @return \think\Response
     */
    public function delete($id)
    {
        $nodes = Menu::field('id,pid')->all()->toArray();

        $arr = Recursion::getChildren($nodes, $id);

        if ($arr) {
            $map = array_column($arr, 'id');
            $map[] = $id;
            return Menu::destroy($map);
        }
        return Menu::destroy($id);
    }
}
