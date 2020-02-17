<template>
  <div class="add-content">
    <input type="text" class="text_input" placeholder="请输入代办事项名称" v-model.trim="todo" />
    <button :disabled="canAddTodo" @click="add" class="add_button">添加</button>
  </div>
</template>

<script>
export default {
  created() {
    this.$root.$on("selectChanged", value => {
      this.canAddTodo = !!value;
    });
  },
  data() {
    return {
      todo: "",
      canAddTodo: false
    };
  },
  methods: {
    add() {
      this.$emit("add", this.todo);
      this.todo = "";
    }
  }
};
</script>

<style scoped>
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