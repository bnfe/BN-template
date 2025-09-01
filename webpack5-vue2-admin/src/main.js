import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "./styles/reset.scss";

// 全局引入element
import ElementUI from "element-ui";
Vue.use(ElementUI);
// 引入element样式
import "@/styles/element-variables.scss";

// 注册组件
import Components from "@/components";
Vue.use(Components);

// 权限配置
import "@/permission";

// https://cli.vuejs.org/zh/guide/mode-and-env.html#在客户端侧代码中使用环境变量
import pkg from "~/package.json";
let { BASE_URL, NODE_ENV, BN_ENV } = process.env;
console.table({
  BASE_URL: BASE_URL,
  NODE_ENV,
  BN_ENV,
  DEV_VER: pkg.version
});
import util from "@/utils/util";
import compute from "@/utils/compute";
import validate from "@/utils/validate";
const prototype = {
  $util: util, // 工具函数
  $compute: compute, //浮点运算
  $validate: validate //正则校验
};

// 挂载原型
for (const [key, value] of Object.entries(prototype)) {
  Vue.prototype[key] = value;
}

// https://cn.vuejs.org/v2/api/index.html#productionTip
Vue.config.productionTip = false;
if (process.env.NODE_ENV === "development") {
  Vue.config.devtools = true;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
