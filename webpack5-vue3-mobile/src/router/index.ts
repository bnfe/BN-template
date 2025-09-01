import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import pkg from "~/package.json";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/index/index.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/pages/error/index.vue"),
    meta: {
      title: "未知错误",
    },
  },
  {
    path: "/:path(.*)*",
    redirect: "/error",
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || pkg.description;
  next();
});

export default router;
