import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import Error404 from "../components/Error404";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: {
      filter: "all"
    }
  },
  {
    path: "/all",
    name: "HomeAll",
    component: Home,
    props: {
      filter: "all"
    }
  },
  {
    path: "/completed",
    name: "HomeCompleted",
    component: Home,
    props: {
      filter: "completed"
    }
  },
  {
    path: "/active",
    name: "HomeActive",
    component: Home,
    props: {
      filter: "active"
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "*",
    name: "Error404",
    component: Error404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
