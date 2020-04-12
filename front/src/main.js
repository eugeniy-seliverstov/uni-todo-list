import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import VueNoty from "vuejs-noty";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(Element);

Vue.use(VueNoty, {
  timeout: 2000,
  progressBar: true,
  theme: "bootstrap-v4"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
