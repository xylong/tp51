var app = new Vue({
    el: '#menu',

    data: {
        data: [],   // 源数据
        node: {
            id: 0,
            pid: 0,
            name: '',
            route: '',
            icon: '',
            sort: '',
            status: 1
        },
    },

    computed: {
        // 树结构
        treeData: function () {
            return tree(this.data);
        },
        // 下拉选项
        options: function () {
            var tmp = JSON.parse(JSON.stringify(this.data));
            return treeSort(tmp);
        }
    },

    methods: {
        init: function () {
            return {
                id: 0,
                pid: 0,
                name: '',
                route: '',
                icon: '',
                sort: '',
                status: 1
            }
        },

        all: function () {
            var _this = this;
            $.get('/admin/menus', function (res) {
                _this.data = res;
            }, 'json');
        },


        //保存
        save: function () {
            if (this.node.id) {
                $.ajax({
                    url: '/admin/menus/' + this.node.id,
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(this.node),
                    dataType: "json",
                    success: function (res) {
                        window.location.reload()
                    },
                });
            } else {
                $.post('/admin/menus', this.node, function (res) {
                    window.location.reload()
                }, 'json');
            }
        },

        cancel: function () {
            this.node = this.init();
        },

    },

    mounted: function () {
        this.$nextTick(function () {
            this.all();
        });
    }
});