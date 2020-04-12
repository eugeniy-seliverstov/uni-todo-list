<template>
  <div class="home">
    <div class="logout" @click="logout">Выйти</div>
    <div class="input-block">
      <input
        type="text"
        v-model="text"
        @keyup.enter="addTodo"
        class="input-block__text"
        placeholder="Введите задачу"
      />
      <el-button @click="addTodo" type="success" class="input-block__btn">
        Добавить
      </el-button>
    </div>
    <div class="links">
      <router-link :to="{ name: 'HomeAll', params: { filter: 'all' } }">
        Все
      </router-link>
      <router-link :to="{ name: 'HomeActive', params: { filter: 'active' } }">
        Активные
      </router-link>
      <router-link
        :to="{ name: 'HomeCompleted', params: { filter: 'completed' } }"
      >
        Закрытые
      </router-link>
    </div>
    <ItemList :todos="todos" />
  </div>
</template>

<script>
import ItemList from "@/components/ItemList";
import { isAuthorized, logout } from "@/api/api.js";

export default {
  name: "Home",
  data: () => ({
    text: ""
  }),
  computed: {
    todos() {
      return this.$store.getters[this.filter];
    }
  },
  props: ["filter"],
  methods: {
    addTodo() {
      this.$store.dispatch("addTodo", this.text);
    },
    logout() {
      logout()
        .then(res => {
          if (res.data.success) {
            this.$router.push("/login");
          }
        })
        .catch(({ response }) => {
          this.$noty.error(response.data.error);
        });
    }
  },
  beforeCreate() {
    isAuthorized()
      .then(res => {
        if (!res.data.authorized) {
          this.$router.push("/login");
        } else {
          this.$store.dispatch("setTodos");
        }
      })
      .catch(({ response }) => {
        this.$noty.error(response.data.error);
      });
  },
  components: {
    ItemList
  }
};
</script>

<style lang="scss">
.input-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  &__text {
    flex-grow: 1;
    margin-right: 20px;
    border: 1px solid #bdbdbd;
    border-radius: 3px;
    font-size: 18px;
    padding: 0 20px;
  }
}
.links {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;

  .router-link-active {
    color: red;
  }
}
.logout {
  cursor: pointer;
}
</style>
