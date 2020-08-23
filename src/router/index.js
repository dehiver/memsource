import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from "@/router/routes.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + ' | ' + process.env.VUE_APP_NAME;

  next();
});

export default router
