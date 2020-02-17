<!--
 * @Description: 
 * @Autor: Sinpo
 * @Date: 2020-02-16 18:33:46
 * @LastEditors: Sinpo
 * @LastEditTime: 2020-02-16 19:35:27
 -->
<template>
  <ul class="list">
    <li class="item" v-for="(todo,index) in todos" :key="index">
      <div>
        <span class="item">{{index+1}}. {{todo.name}}</span>
        <button v-if="todo.status" @click="changeStatus(todo.name)">已完成</button>
        <button v-else @click="changeStatus(todo.name)">未完成</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    todos() {
      return JSON.parse(window.localStorage.getItem("todos"));
    }
  },
  methods: {
    changeStatus(name) {
      const todos = JSON.parse(window.localStorage.getItem("todos"));
      todos.forEach(todo => {
        if(todo.name === name){
          todo.status = !todo.status;
        }
      });
       window.localStorage.setItem("todos", JSON.stringify(todos));
       this.$router.go(0);
    }
  }
};
</script>

<style  scoped>
.list {
  list-style: none;
  padding: 0px;
 margin: 0px 25px;
}

.item {
  list-style: none;
  display: inline-block;
  width: 90%;
  padding: 5px 0px;
}
</style>