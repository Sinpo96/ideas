/*
 * @Description: 入口文件app.js
 * @Autor: Sinpo
 * @Date: 2020-02-16 17:43:25
 * @LastEditors  : Sinpo
 * @LastEditTime : 2020-02-16 19:34:36
 */
import Vue from 'vue';
import App from './app/App.vue';

import VueRouter from 'vue-router';
import Index from './views/All.vue';
import Completed from './views/Completed.vue';
import Uncompleted from './views/UnCompleted.vue';

Vue.use(VueRouter);

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err);
}

const routes = [
    {
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        name: 'all',
        component: Index
    }, {
        path: '/completed',
        name: 'completed',
        component: Completed
    }, {
        path: '/uncompleted',
        name: 'uncompleted',
        component: Uncompleted
    }
];

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});