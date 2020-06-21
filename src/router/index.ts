import Vue from "vue";
import VueRouter from "vue-router";
import HomePageView from "@/views/HomePageView.vue";
import PlayerView from "@/views/PlayerView.vue";
import TableView from "@/views/TableView.vue";
import TestDeckComponent from "@/components/TestDeckComponent.vue";
import TestSocketComponent from "@/components/TestSocketComponent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomePageView
  },
  {
    path: "/deck",
    component: TestDeckComponent
  },
  {
    path: "/test",
    component: TestSocketComponent
  },
  {
    path: "/player",
    component: PlayerView
  },
  {
    path: "/table",
    component: TableView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
