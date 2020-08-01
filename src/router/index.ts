import Vue from "vue";
import VueRouter from "vue-router";
import HomePageView from "@/views/HomePageView.vue";
import PlayerView from "@/views/PlayerView.vue";
import TableView from "@/views/TableView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePageView
  },
  {
    path: "/player/:playerId/:roomName",
    component: PlayerView
  },
  {
    path: "/table/:roomName",
    component: TableView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
