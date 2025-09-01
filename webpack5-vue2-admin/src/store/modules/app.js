export default {
  namespaced: true,
  state: {
    sidebar: {
      opened: localStorage.getItem("sidebarStatus") || 1,
      withoutAnimation: false
    },
    device: "desktop",
    sideTheme: {
      menuText: "rgba(255, 255, 255, .65)",
      menuActiveText: "#fff",
      menuBg: "#292E5D",
      menuHover: "",
      subMenuBg: "#fff",
      subMenuHover: "",
      subMenuActiveText: "#fff",
      activeBg: "",
      textHover: "#f4f4f5",
      sideBarWidth: "236px",
      sideBarBg: "#292E5D"
    },
    containerTheme: {}
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        localStorage.setItem("sidebarStatus", 1);
      } else {
        localStorage.setItem("sidebarStatus", 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      localStorage.setItem("sidebarStatus", 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    TOGGLE_SIDEBARTHEME: state => {
      state.sideTheme = state.sideTheme;
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    ToggleSideTheme: ({ commit }) => {
      commit("TOGGLE_SIDEBARTHEME");
    }
  },
  getters: {
    sidebar(state) {
      return state.sidebar;
    },
    sidebarTheme(state) {
      return state.sideTheme;
    }
  }
};
