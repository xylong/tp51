<?php
/**
 * Created by PhpStorm.
 * User: xuyunlong
 * Date: 2018/11/11
 * Time: 9:47 AM
 */

namespace helper;

class Recursion
{
    /**
     * 生成树形结构
     * @param $data
     * @param int $pid
     * @return array
     */
    public static function buildTree($data, $pid = 0)
    {
        $arr = [];

        foreach ($data as $value) {
            if ($pid == $value['pid']) {
                $value['children'] = self::buildTree($data, $value['id']);
                $arr[] = $value;
            }
        }

        return $arr;
    }

    /**
     * 生成后台菜单
     * @param $active 需要高亮的id
     * @param $nodes    所有节点
     * @param int $pid 父级id
     * @return string   html
     */
    public static function createMenu($active, $nodes, $pid = 0)
    {
        $html = '';

        foreach ($nodes as $node) {
            if ($node['status'] && $node['pid'] == $pid) {
                $is_active = in_array($node['id'], $active) ? ' active' : '';
                $is_open = in_array($node['id'], $active) ? ' open' : '';

                $html .= '<li class="nav-item' . $is_active . $is_open . '">';
                $html .= $node['route'] ? '<a href="/' . $node['route'] . '" class="nav-link">' : '<a href="javascript:;" class="nav-link nav-toggle">';
                $html .= $node['icon'] ? '<i class="' . $node['icon'] . '"></i>&nbsp;' : '';
                $html .= '<span class="title">' . $node['name'] . '</span>';
                $html .= '<span class="selected"></span>';
                $html .= !$node['route'] ? '<span class="arrow' . $is_open . '"></span>' : '';
                $html .= '</a>';
                $html .= self::createMenu($active, $nodes, $node['id']);
                $html .= '</li>';
            }
        }

        return 0 === $pid ? $html : '<ul class="sub-menu">' . $html . '</ul>';
    }

    /**
     * 获取所有父级
     * @param $data
     * @param $id
     * @return array
     */
    public static function getParents($data, $id)
    {
        $arr = [];

        foreach ($data as $value) {
            if ($id == $value['id']) {
                $arr[] = $value;
                $parent = self::getParents($data, $value['pid']);
                $parent && $arr = array_merge($parent, $arr);
            }
        }

        return $arr;
    }

    /**
     * 获取所有子级
     * @param $data
     * @param $id
     * @return array
     */
    public static function getChildren($data, $id)
    {
        static $arr = [];

        foreach ($data as $value) {
            if ($id == $value['pid']) {
                $arr[] = $value;
                self::getChildren($data, $value['id']);
            }
        }

        return $arr;
    }
}