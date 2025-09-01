import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "./styles/reset.scss";

// 全局引入vant
import Vant from "vant";
Vue.use(Vant);
import "@vant/touch-emulator";

// import "amfe-flexible";
import "@/utils/flexible";

import pkg from "~/package.json";
console.table({
  BASE_URL: process.env.BASE_URL,
  DEV_MODE: process.env.NODE_ENV,
  DEV_VER: pkg.version,
});

import util from "@/utils/util";
import compute from "@/utils/compute";
import validate from "@/utils/validate";

const prototype = {
  $util: util, // 工具函数
  $compute: compute, //浮点运算
  $validate: validate, //正则校验
};

// 挂载原型
for (const [key, value] of Object.entries(prototype)) {
  Vue.prototype[key] = value;
}

if (process.env.NODE_ENV === "development") {
  eruda.init();
}

// https://cn.vuejs.org/v2/api/index.html#productionTip
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
