import Vue from "vue";
import VueRouter from "vue-router";
import HomePageView from "@/views/HomePageView.vue";
import PlayerView from "@/views/PlayerView.vue";
import TestDeckComponent from "@/components/TestDeckComponent.vue";
import TestChildComponent from "@/components/TestChildComponent.vue";

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
    path: "/player",
    component: PlayerView,
    children: [
      {
        path: "test",
        component: TestChildComponent
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
