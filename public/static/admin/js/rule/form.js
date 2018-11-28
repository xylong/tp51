Vue.component('rule-form', {
    template: '#rule-form',

    props: {
        // rules: {
        //     type: Array
        // },
        rule: {
            type: Object
        },
        options:{
            type:Array
        }
    },

    data: function () {
        return {
            // options: [],
        }
    },

    computed: {

    },

    watch: {
        // rules: function (val) {
        //     this.options = treeSort(val);
        // }
    },

    methods: {
        save: function () {
            if (this.rule.id) {
                $.ajax({
                    url: '/manage/rules/' + this.rule.id,
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify(this.rule),
                    dataType: "json",
                    success: function (res) {
                        window.location.reload()
                    },
                    error:function (res) {
                        appAlert(res.responseJSON.msg, 'danger');
                    }
                });
            } else {
                $.ajax({
                    url: '/manage/rules',
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(this.rule),
                    dataType: "json",
                    success: function (res) {
                        window.location.reload()
                    },
                    error:function (res) {
                        appAlert(res.responseJSON.msg, 'danger');
                    }
                });
            }
        },

        cancel: function () {

        }
    },

    mounted: function () {
    }
})