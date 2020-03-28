import VueSocketIOExt from "vue-socket.io-extended";
import Vue from "vue";
import io from "socket.io-client";

const socket = io("http://localhost:3003");

Vue.use(VueSocketIOExt, socket);

export default new VueSocketIOExt();
