// import { getUserInfo } from "@/api";

export default {
  namespaced: true,
  state: {
    userInfo: {},
    message: "",
  },
  mutations: {
    HANDLE_USERINFO(state, payload) {
      state.userInfo = payload;
    },
    HANDLE_ERROR(state, payload) {
      state.message = payload;
    },
  },
  actions: {
    handleUserInfo({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let res = await getUserInfo(payload);
          commit("HANDLE_USERINFO", res.data);
          resolve();
        } catch (error) {
          commit("HANDLE_ERROR", error.message);
          reject(error);
        }
      });
    },
    handleError({ commit }, payload) {
      commit("HANDLE_ERROR", payload);
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
  },
};
