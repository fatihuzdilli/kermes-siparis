import Vue from "vue";
import VueFire from "vuefire";
import VueRouter from "vue-router";
import NProgress from "nprogress";

import App from "./App.vue";

import AddItem from "./components/AddItem.vue";
import EditItem from "./components/EditItem.vue";
import List from "./components/List.vue";

import "../node_modules/nprogress/nprogress.css";

Vue.use(VueFire);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const routes = [
  {
    name: "List",
    path: "/",
    component: List
  },
  {
    name: "Add",
    path: "/add/:key",
    component: AddItem
  },
  {
    name: "Edit",
    path: "/edit/:id",
    component: EditItem
  }
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");
