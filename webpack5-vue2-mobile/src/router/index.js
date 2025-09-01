import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
Vue.use(VueRouter);
import store from "@/store";
import pkg from "~/package.json";

// 解决路由重复
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

const whiteList = ["/error"]; // 白名单

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || pkg.description;
  // 判断用户是否登录
  let {
    user: { userInfo },
  } = store.state;
  const isLogin = Object.keys(userInfo).length;
  if (isLogin) {
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next();
    }
  }
  if (from.meta.keepAlive) {
    const scrollTop = document.scrollingElement.scrollTop || 0;
    from.meta.scrollTop = scrollTop;
  }
});

export default router;
