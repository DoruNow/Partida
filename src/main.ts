import Vue from "vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueSocketIO from "vue-socket.io-extended";
import io from "socket.io-client";

// @ts-ignore
import App from "./App.vue";

Vue.config.productionTip = false;
const socket = io("http://localhost:3000");

Vue.use(VueSocketIO, socket);
new Vue({
  router,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount("#app");
