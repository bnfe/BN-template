<template>
  <div class="admin-index" :class="changeClass">
    <sidebar class="sidebar-container"></sidebar>
    <div class="admin-container">
      <header-view class="header-view"></header-view>
      <tags-view></tags-view>
      <div class="main-container">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="$route.fullPath" />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from "./HeaderView";
import Sidebar from "./Sidebar";
import TagsView from "./TagsView";
import { mapGetters } from "vuex";
export default {
  components: {
    HeaderView,
    Sidebar,
    TagsView
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      sidebar: "app/sidebar"
    }),
    changeClass() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      };
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.admin-index {
  position: relative;
  height: 100%;
  width: 100%;

  .admin-container {
    background-color: #f3f4fb;
    height: 100%;
    position: relative;
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: 236px;
    overflow: hidden;
    .main-container {
      padding: 20px;
      box-sizing: border-box;
      height: calc(100% - 92px);
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  .sidebar-container {
    transition: width 0.28s;
    width: 236px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    overflow: hidden;
    // padding: 0 18px;
    //reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }
    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }
    .scrollbar-wrapper {
      .el-scrollbar__view {
        height: 100%;
      }
    }
    .is-horizontal {
      display: none;
    }
    a {
      display: inline-block;
      width: 100%;
      overflow: hidden;
    }
    .svg-icon {
      margin-right: 16px;
    }
    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }
    .is-active > .el-submenu__title {
      color: #f4f4f5 !important;
    }

    .el-submenu {
      .el-menu-item {
        height: 45px !important;
        line-height: 34px !important;
      }
    }
  }
}
.hideSidebar {
  .sidebar-container {
    width: 90px !important;
    padding: 0 !important;
    transition: width 0.28s;
  }
  .admin-container {
    margin-left: 90px;
  }
  .submenu-title-noDropdown {
    padding-left: 18px !important;
    position: relative;
    .el-tooltip {
      padding: 0 10px !important;
    }
  }
  .el-submenu {
    overflow: hidden;
    & > .el-submenu__title {
      padding-left: 18px !important;
      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}
</style>
