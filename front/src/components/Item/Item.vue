<template>
  <div class="item-list__item" :class="{ completed: todo.is_done }">
    <el-checkbox @change="changeCheck" :value="Boolean(todo.is_done)"></el-checkbox>
    <span
      v-if="!changing"
      class="item-list__text"
      @click="changeCheck"
      :class="{ completed: todo.is_done }"
    >
      {{ todo.text }}
    </span>
    <input
      v-else
      v-model="todo.text"
      @keyup.enter="closeChangeTodo"
      type="text"
      class="item-list__input"
    />
    <el-button
      v-if="!changing"
      @click="changeTodo"
      type="primary"
      icon="el-icon-edit"
    ></el-button>
    <el-button
      v-else
      @click="closeChangeTodo"
      type="success"
      icon="el-icon-check"
    ></el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      @click="$emit('delete-todo', todo.id)"
    ></el-button>
  </div>
</template>

<script>
export default {
  name: "Item",
  data: function() {
    return {
      changing: false
    };
  },
  props: ["todo"],
  methods: {
    changeCheck: function() {
      this.$store.dispatch("changeStatus", this.todo);
    },
    changeTodo: function() {
      this.changing = !this.changing;
    },
    closeChangeTodo: function() {
      this.changing = !this.changing;
      this.$store.dispatch("updateTodo", this.todo);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
