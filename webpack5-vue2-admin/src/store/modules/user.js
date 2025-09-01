import { UserLogin, UserInfo } from "@/api/index";
import { resetRouter } from "@/router";
import util from "@/utils/util";

// TODO 判断用户角色
function handleRoles(store_id) {
  return store_id === "0" ? ["admin"] : ["guest"];
}

export default {
  namespaced: true,
  state: {
    userInfo: {}
  },

  mutations: {
    HANDLE_USER_INFO(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    async login({ commit }, payload) {
      let { data } = await UserLogin(payload);
      util.local("token", data.token);
      return Promise.resolve(data);
    },
    async getInfo({ commit }, payload) {
      let { data } = await UserInfo();
      commit("HANDLE_USER_INFO", data);
      // TODO 返回角色
      // return Promise.resolve(handleRoles(data.store_id));
      return Promise.resolve(data);
    },
    async handleLogout({ commit }, payload) {
      util.removeLocal("token");
      resetRouter();
      commit("HANDLE_LOGOUT");
    }
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    }
  }
};
