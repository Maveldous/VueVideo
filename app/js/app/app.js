var Vue = require('vue');

new Vue ({
    el: '#app',
    render: function (init) {
        return init(require('../../vue/index.vue'));
    }
})