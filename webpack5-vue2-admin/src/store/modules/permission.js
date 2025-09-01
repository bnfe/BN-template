import { asyncRoutes, constantRoutes } from "@/router";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

function hasRoutes(serverRoutes, route) {
  let isContain = false;
  serverRoutes.forEach(e => {
    if (e.name === route.name) {
      isContain = true;
    } else {
      if (e.children) {
        e.children.forEach(v => {
          if (v.name === route.name) {
            isContain = true;
          }
        });
      }
    }
  });

  return isContain;
}

// export function filterAsyncRoutes(routes, roles) {
//   const res = [];
//   routes.forEach((route) => {
//     const tmp = { ...route };
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRoutes(tmp.children, roles);
//       }
//       res.push(tmp);
//     }
//   });
//   return res;
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, serverRoutes) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasRoutes(serverRoutes, tmp)) {
      if (tmp.children) {
        let arr = [];
        tmp.children.forEach(e => {
          if (hasRoutes(serverRoutes, e)) {
            arr.push(e);
          }
        });
        tmp.children = arr;
      }
      res.push(tmp);
    }
  });
  return res;
}

export default {
  namespaced: true,
  state: {
    routes: [...constantRoutes],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES(state, routes) {
      state.addRoutes = routes;
      state.routes = state.routes.concat(routes);
    }
  },
  actions: {
    // generateRoutes({ commit }, roles) {
    //   return new Promise((resolve) => {
    //     let accessedRoutes;
    //     accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    //     commit("SET_ROUTES", accessedRoutes);
    //     resolve(accessedRoutes);
    //   });
    // },

    // 后台返回路由
    generateRoutes({ commit }, serverRoutes) {
      return new Promise(resolve => {
        let accessedRoutes;
        accessedRoutes = filterAsyncRoutes(asyncRoutes, serverRoutes);
        commit("SET_ROUTES", accessedRoutes);
        resolve(accessedRoutes);
      });
    }
  },
  getters: {
    permission_routes(state) {
      return state.routes;
    }
  }
};
