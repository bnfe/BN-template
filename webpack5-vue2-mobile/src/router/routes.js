let routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/pages/index"),
    meta: {
      // keepAlive: true,
    },
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/pages/error"),
    meta: {
      title: "生活总归带点荒谬~",
    },
  },
  {
    path: "*",
    redirect: "/error",
  },
];

export default routes;
