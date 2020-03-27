import Vue from "vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueSocketIOExt from "vue-socket.io-extended";

import App from "./App.vue";
// import io from "socket.io-client";

Vue.config.productionTip = false;
const socket = io("http://localhost:3000");

socket.on("joinroom", data => {
  console.log(data);
});

new Vue({
  router,
  vuetify,
  VueSocketIOExt,
  socket,
  render: h => h(App)
}).$mount("#app");
