import router from "@/router";
import store from "@/store";
import pkg from "~/package.json";

import NProgress from "nprogress";
import util from "@/utils/util";

NProgress.configure({
  showSpinner: false,
}); // NProgress 配置

const whiteList = ["/login"]; // 白名单

router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start();
  // 设置标题
  document.title = to.meta.title || pkg.description;
  next();
  // let {
  //   user: { userInfo },
  // } = store.state;
  // if (util.local("token")) {
  //   // const hasRoles = userInfo.roles && userInfo.roles.length;
  //   const hasRoles = userInfo.resource_route && userInfo.resource_route.length;
  //   if (hasRoles) {
  //     next();
  //   } else {
  //     // // 全部加载路由
  //     // let roles = await store.dispatch("user/getInfo");
  //     // const accessRoutes = await store.dispatch("permission/generateRoutes", roles);

  //     // 接口返回路由
  //     let res = await store.dispatch("user/getInfo");
  //     const accessRoutes = await store.dispatch("permission/generateRoutes", res.resource_route);

  //     accessRoutes.forEach((item) => {
  //       router.addRoute(item);
  //     });
  //     router.options.isAddAsyncMenuData = true;
  //     next({ ...to, replace: true });
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) > -1) {
  //     next();
  //   } else {
  //     next("/login");
  //     NProgress.done();
  //   }
  // }
});

router.afterEach(() => {
  NProgress.done();
});
