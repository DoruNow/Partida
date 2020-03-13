import Vue from "vue";
import VueRouter from "vue-router";
import LicitatiiView from "@/views/LicitatiiView.vue";
import TestDeckComponent from "@/components/TestDeckComponent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: LicitatiiView
  },
  {
    path: "/deck",
    component: TestDeckComponent
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
