import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

/**
 * constantRoutes 一个没有权限要求的基页可以访问所有角色
 * hidden: true 该路由不会在侧边栏出现
 * alwaysShow: true 这样它就会忽略之前定义的规则，一直显示根路由
 *
 * affix: true 如果设置为true，标签将附加在标签视图中
 * activeMenu: '/example/list' 如果设置路径，侧边栏将突出显示您设置的路径
 */
import Layout from "@/layout";

/**
 * 将指定组件设置自定义名称
 *
 * @param {String} name 组件自定义名称
 * @param {Component | Promise<Component>} component
 * @return {Component}
 */
export function createCustomComponent(name, component) {
  return {
    name,
    data() {
      return { component: null };
    },
    async created() {
      if (component instanceof Promise) {
        try {
          const module = await component;
          this.component = module?.default;
        } catch (error) {
          console.error(`can not resolve component ${name}, error:`, error);
        }

        return;
      }
      this.component = component;
    },
    render(h) {
      return this.component ? h(this.component) : null;
    }
  };
}

// https://element.eleme.io/#/zh-CN/component/icon
export const constantRoutes = [
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/pages/login"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/error",
    name: "error",
    hidden: true,
    component: () => import("@/pages/error"),
    meta: {
      title: "error"
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/pages/dashboard"),
        meta: {
          title: "首页",
          icon: "el-icon-house",
          affix: true
        }
      }
    ]
  },
  {
    path: "*",
    redirect: "/error",
    hidden: true
  }
];

export const asyncRoutes = [];

// 解决重复触发同一路由
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // 需要服务端支持
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    },
    routes: constantRoutes
  });

// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

const router = createRouter();

export default router;
