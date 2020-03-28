import Vue from "vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import socket from "./plugins/socket";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  VueSocketIOExt,
  socket,
  render: h => h(App)
}).$mount("#app");
