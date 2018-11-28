/**
 * 树
 * @param data 源数据
 * @param pid 父级🆔
 * @param level 等级
 * @returns {Array}
 */
function tree(data, pid = 0, level = 0) {
    var arr = [];

    for (var i = 0; i < data.length; i++) {
        if (data[i]['pid'] == pid) {
            data[i]['level'] = level;
            data[i]['children'] = tree(data, data[i]['id'], level + 1);
            arr.push(data[i]);
        }
    }
    return arr;
}

/**
 * 递归排序
 * @param data 源数据
 * @param pid 父级🆔
 * @returns {Array}
 */
function treeSort(data, pid = 0) {
    var len = data.length,
        flag = '——',
        arr = [];

    var forFn = function (data, pid, level = 0) {
        for (var i = 0; i < len; i++) {
            if (data[i]['pid'] == pid) {
                data[i]['level'] = level;
                data[i]['name'] = (new Array(level + 1)).join(flag) + data[i]['name'];
                arr.push(data[i]);
                forFn(data, data[i]['id'], level + 1);
            }
        }
    };

    forFn(data, pid);
    return arr;
}