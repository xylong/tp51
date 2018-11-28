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
function treeSort(data, pid = 0, field = 'name') {
    var len = data.length,
        flag = '——',
        arr = [];

    var forFn = function (data, pid, field, level = 0) {
        for (var i = 0; i < len; i++) {
            if (data[i]['pid'] == pid) {
                data[i]['level'] = level;
                data[i][field] = (new Array(level + 1)).join(flag) + data[i][field];
                arr.push(data[i]);
                forFn(data, data[i]['id'], field, level + 1);
            }
        }
    };

    forFn(data, pid, field);
    return arr;
}

/**
 * 所有子级
 * @param arr 源数据
 * @param id 父级🆔
 * @returns {Array}
 */
function children(arr, id) {
    var temp = [], lev = 0;

    var forFn = function (arr, id, lev) {
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.pid == id) {
                item.lev = lev;
                if (undefined !== item.status && item.status) {
                    temp.push(item);
                }
                forFn(arr, item.id, lev + 1);
            }
        }
    };

    forFn(arr, id, lev);
    return temp;
}