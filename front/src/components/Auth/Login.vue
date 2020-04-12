<template>
  <div class="auth">
    <h1>Войти</h1>
    <form class="auth__login" @submit.prevent="auth">
      <input type="text" v-model="login" placeholder="Введите логин" />
      <input type="password" v-model="password" placeholder="Введите пароль" />
      <button>Войти</button>
      <router-link to="/register" class="auth__link">Регистрация</router-link>
    </form>
  </div>
</template>

<script>
import { isPassword, isLogin } from "@/filters/auth";
import { login } from "@/api/api.js";

export default {
  name: "Login",
  data: function() {
    return {
      password: "",
      login: ""
    };
  },
  methods: {
    auth() {
      if (!this.login) {
        this.$noty.error("Необходимо заполнить логин");
        return;
      }
      if (!this.password) {
        this.$noty.error("Необходимо заполнить пароль");
        return;
      }
      if (!this.login.match(isLogin)) {
        this.$noty.warning(
          "Логин должен содержать только латинские символы или буквы"
        );
        return;
      }
      if (!this.password.match(isPassword)) {
        this.$noty.warning(
          "Пароль должен быть не менее 6 и не более 16 символов"
        );
        return;
      }
      login({ login: this.login, password: this.password })
        .then(res => {
          if (res.data.success) {
            this.$router.push("/");
          }
        })
        .catch(({ response }) => {
          this.$noty.error(response.data.error);
        });
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
