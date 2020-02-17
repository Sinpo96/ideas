<template>
  <div class="content-div">
    <p class="content-div">
      <input type="radio" v-model="picked" value="0" @click="filterTodos(0)" />
      <label>所有</label>
      <input type="radio" v-model="picked" value="1" @click="filterTodos(1)" />
      <label>已完成</label>
      <input type="radio" v-model="picked" value="2" @click="filterTodos(2)" />
      <label>未完成</label>
    </p>
    <p
      class="content-div"
    >当前共有{{todoList.length}}个代办事项,已完成{{completed}}个,剩余{{todoList.length-completed}}个。</p>
    <ul class="list">
      <li class="item" v-for="(todo,index) in tempTodoList" :key="index">
        <div>
          <span class="item">{{index+1}}. {{todo.name}}</span>
          <button v-if="todo.status" @click="changeStatus(index)">已完成</button>
          <button v-else @click="changeStatus(index)">未完成</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["todos"],
  data: function() {
    return {
      todoList: this.todos,
      picked: 0,
      tempTodoList: []
    };
  },
  computed: {
    completed() {
      return this.todoList.filter(x => x.status).length;
    }
  },
  methods: {
    changeStatus(index) {
      this.tempTodoList[index].status = !this.tempTodoList[index].status;
      this.filterTodos(parseInt(this.picked));
    },
    filterTodos(type) {
      this.$root.$emit("selectChanged", type);
      switch (type) {
        case 0:
          this.tempTodoList = this.todoList;
          break;
        case 1:
          this.tempTodoList = this.todoList.filter(x => x.status);
          break;
        case 2:
          this.tempTodoList = this.todoList.filter(x => !x.status);
          break;
      }
    }
  },
  mounted() {
    this.tempTodoList = this.todoList;
  }
};
</script>

<style scoped>
.content-div {
  font-size: 16px;
  margin-left: 15px;
}
.list {
  list-style: none;
  padding: 0px;
  margin-left: 15px;
}
.item {
  list-style: none;
  display: inline-block;
  width: 90%;
  padding-top: 10px;
}
</style>