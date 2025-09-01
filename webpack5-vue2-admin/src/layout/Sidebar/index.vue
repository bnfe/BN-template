<template>
  <div :style="`background: ${sidebarTheme.sideBarBg}`">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="logo-left">
        <div v-if="isCollapse" class="logo-small">
          <a href class="header-left">
            <img class="logo-image" src="@/static/icon/logo-small.png" alt />
          </a>
        </div>
        <div v-else class="logo-wide">
          <a href class="header-left">
            <img class="logo" src="@/static/icon/logo.png" alt />
          </a>
        </div>
      </div>
      <el-menu
        mode="vertical"
        :background-color="sidebarTheme.menuBg"
        :default-active="activeMenu"
        :unique-opened="true"
        :collapse-transition="true"
        :collapse="isCollapse"
        class="menu"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SidebarItem from "./SidebarItem";
export default {
  components: {
    SidebarItem
  },
  data() {
    return {
      dialogVisible: false,
      default_avatar: ""
    };
  },
  mounted() {
    // console.log(this.sidebar, this.sidebarTheme, 'sidebarTheme');
  },
  methods: {},
  computed: {
    ...mapGetters({
      permission_routes: "permission/permission_routes",
      sidebar: "app/sidebar",
      sidebarTheme: "app/sidebarTheme"
    }),
    isCollapse() {
      return !this.sidebar.opened;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // 如果设置了路径，会高亮你设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  }
};
</script>

<style lang="scss">
.sidebar-container {
  width: 100%;
  height: 100%;
  @include clearfix;
  .logo-wide {
    width: 236px;
    height: 60px;
    background-color: $theme-color;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      width: 142px;
      height: 22px;
      margin: 0 auto;
    }
  }
  .logo-small {
    width: 90px;
    height: 60px;
    background-color: $theme-color;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo-image {
      width: 42px;
      height: 14px;
      margin: 0 auto;
    }
  }
  .menu {
    padding: 0 18px;
    box-sizing: border-box;
  }
}
</style>
