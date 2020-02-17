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
      return this.$store.state.todos.filter(x => x.status);
    }
  },
  methods: {
    changeStatus(name) {
      this.$store.commit('changeTodoState',name);
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