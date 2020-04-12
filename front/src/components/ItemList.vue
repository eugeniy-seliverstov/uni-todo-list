<template>
  <div class="item-list">
    <Item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
import Item from "@/components/Item/Item";

export default {
  name: "ItemList",
  props: ["todos"],
  components: {
    Item
  },
  methods: {
    deleteTodo: function(id) {
      this.$store.dispatch("removeTodo", id);
    }
  }
};
</script>
