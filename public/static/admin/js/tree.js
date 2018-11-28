Vue.component('node', {
    template: '#node-template',

    props: {
        model: Object
    },

    data: function () {
        return {
            open: true,
        }
    },

    computed: {
        isFolder: function () {
            return this.model.children && this.model.children.length
        },
        isActive: function () {
            return app.node.id == this.model.id;
        }
    },

    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.open = !this.open
            }
        },
        changeType: function () {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
        },
        addChild: function () {
            app.node = app.init();
            app.node.pid = this.model.id;
        },
        editCurrent: function () {
            app.node = this.model;
        },
        remove: function () {
            var id = this.model.id;
            swal({
                    title: "确定删除吗？",
                    text: "删除节点将会同时删除其子节点，删除后不可恢复！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#36c6d3",
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        swal("操作成功！", "节点已删除",
                            "success");
                        $.ajax({
                            url: '/admin/menus/' + id,
                            type: "DELETE",
                            contentType: "application/json",
                            data: '',
                            dataType: "json",
                            success: function (res) {
                                console.log(res);
                                // window.location.reload();
                            },
                        });
                    } else {
                        swal("已取消！", "节点是安全的:)",
                            "error");
                    }
                });
        }
    },
})