import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import "./styles/reset.scss";

import "amfe-flexible";
import Vant from "vant";

import eruda from "eruda";
if (process.env.BN_ENV !== "prod") {
  eruda.init();
}

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Vant);

app.mount("#app");
