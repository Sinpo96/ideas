/*
 * @Description: Vuex
 * @Autor: Sinpo
 * @Date: 2020-02-17 14:38:01
 * @LastEditors: Sinpo
 * @LastEditTime: 2020-02-17 14:38:48
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todos: [
            { name: "JavaScript", status: true },
            { name: "Css", status: false },
            { name: "Vue", status: true }
        ]
    },
    mutations: {
        changeTodoState(state, name) {
            state.todos.forEach(todo => {
                if (todo.name === name) {
                    todo.status = !todo.status;
                }
            });
        },
        addTodo(state, todo) {
            state.todos.push(todo);
        }
    }
});

export default store;