var app = new Vue({
    el: '#rule',

    data: {
        origin: [], // 源数据
        rules: [],
        // treeData: [],
        rule: {
            id: 0,
            pid: 0,
            name: '',
            title: '',
            condition: '',
            status: 1,
            sort: 0,
            type: 0
        }
    },

    computed: {
        // 树结构
        treeData: function () {
            return tree(this.origin);
        },
        // 下拉选项
        options: function () {
            var tmp = JSON.parse(JSON.stringify(this.origin));
            return treeSort(tmp,0,'title');
        }
    },

    methods: {
        all: function () {
            var _this = this;
            $.get('/admin/rules', function (res) {
                _this.origin=res;
            },'json');
        },
    },

    mounted: function () {
        this.$nextTick(function () {
            this.all();
        });
    }
});
