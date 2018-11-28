Vue.component('rule-list', {
    template: '#rule-list',

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
        edit: function () {
            app.rule=this.model;
        },
        remove: function () {

        }
    },

    mounted: function () {
        this.$nextTick(function () {
        });
    }
})