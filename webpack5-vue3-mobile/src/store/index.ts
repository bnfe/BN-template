import { createPinia } from "pinia";
import { PiniaLogger } from "pinia-logger";
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();

if (process.env.NODE_ENV === "development") {
  pinia.use(
    PiniaLogger({
      expanded: true,
    }),
  );
}
pinia.use(
  createPersistedState({
    auto: true,
    storage: sessionStorage,
    key: id => `pinia-${id}`,
  }),
);

export default pinia;
