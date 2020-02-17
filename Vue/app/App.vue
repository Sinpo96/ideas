<template>
  <div class="content">
    <header class="header">My Todo List</header>
    <div class="add-content">
      <input type="text" class="text_input" placeholder="请输入代办事项名称" v-model.trim="todo" />
      <button @click="add" class="add_button">添加</button>
      <p
        class="content-div"
      >当前共有{{this.$store.todoList.length}}个代办事项,已完成{{completed}}个,剩余{{todoList.length-completed}}个。</p>
      <p class="content-div">
        
        <router-link to="/index">全部</router-link>
        <router-link to="/completed">已完成</router-link>
        <router-link to="/uncompleted">未完成</router-link>
      </p>
    </div>

    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: "",
      todoList: [],
      picked: 0,
    };
  },
  computed: {
    completed() {
        return this.$store.state.todos.filter(x => x.status).length;
    }
  },
  methods: {
    add() {
      this.picked = 0;
      this.$store.commit("addTodo", { name: this.todo, status: false });
      window.localStorage.setItem("todos", JSON.stringify(this.todoList));
      this.$router.go(0);
    }
  },
  mounted() {
    this.todoList = [
      { name: "JavaScript", status: true },
      { name: "Css", status: false },
      { name: "Vue", status: true }
    ];

     window.localStorage.setItem("todos", JSON.stringify(this.todoList));
  }
};
</script>

<style scoped>
.content {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background-color: rgb(245, 245, 245);
  padding: 24px 0;
}
.header {
  font-size: 48px;
  text-align: center;
}
.content-div {
  font-size: 16px;
}
.add-content {
  font-size: 16px;
  margin-left: 15px;
  padding: 10px;
}
.text_input {
  width: 90%;
  height: 30px;
  padding: 10px 10px;
  font-size: 14px;
  border: 1px solid transparent;
}
.add_button {
  width: 60px;
  height: 30px;
}
</style>