import "vue-router";

declare module "vue-router" {
  // https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
  interface RouteMeta {
    title?: string;
    keepAlive?: boolean;
  }
}
