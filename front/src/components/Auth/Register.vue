<template>
  <div class="auth">
    <h1>Регистрация</h1>
    <form class="auth__login" @submit.prevent="register">
      <input type="text" v-model="login" placeholder="Введите логин" />
      <input type="password" v-model="password" placeholder="Введите пароль" />
      <button>Зарегистрироваться</button>
      <router-link to="/login" class="auth__link">Войти</router-link>
    </form>
  </div>
</template>

<script>
import { isPassword, isLogin } from "@/filters/auth.js";
import { register } from "@/api/api.js";

export default {
  name: "Register",
  data: function() {
    return {
      password: "",
      login: ""
    };
  },
  methods: {
    register() {
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
      register({ login: this.login, password: this.password })
        .then(res => {
          if (res.data.success) {
            this.$noty.success("Пользователь успешно зарегистрирован");
            this.$router.push("/login");
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
