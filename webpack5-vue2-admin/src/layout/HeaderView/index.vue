<template>
  <el-header>
    <div class="header-main">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="Boolean(sidebar.opened)"
        class="hamburger-left"
      />
      <div class="header-left">
        <breadcrumb></breadcrumb>
      </div>
      <div class="header-right">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="@/static/icon/profile.png" alt />
          <p class="name">{{ userInfo.name || "" }}</p>
        </div>
        <el-divider direction="vertical"></el-divider>
        <img class="close" src="@/static/icon/close.png" alt @click="dialogVisible = true" />
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="600px" :append-to-body="true">
      <p>确定要退出系统？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLogout">确 定</el-button>
      </span>
    </el-dialog>
  </el-header>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      default_avatar: ""
    };
  },
  computed: {
    ...mapGetters({
      permission_routes: "permission/permission_routes",
      sidebar: "app/sidebar",
      userInfo: "user/getUserInfo"
    }),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // 如果设置了路径，会高亮你设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },
  mounted() {},
  methods: {
    visibleChange(value) {},
    async handleLogout() {
      await this.$store.dispatch("user/handleLogout");
      await this.$store.dispatch("tagsView/delAllCachedViews");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    toggleSideBar() {
      this.$store.dispatch("app/ToggleSideBar");
    }
  }
};
</script>

<style lang="scss">
.el-header {
  background-color: #fff;
  height: 60px !important;
  line-height: 60px !important;
  // box-shadow: 0px 10px 35px 0px rgba(47, 63, 95, 0.08);
  border-bottom: 1px solid rgba(231, 233, 238, 1);
  box-sizing: border-box;
  position: relative;
  padding: 0 !important;
  .header-main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    padding-left: 35px;
    margin: auto;
  }
  .header-left {
    flex: 1;
  }
  .header-right {
    display: flex;
    align-items: center;
    color: #333;
    .avatar-wrapper {
      display: flex;
      align-items: center;
      margin-right: 26px;
      .user-avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
      }
      .name {
        margin-left: 10px;
      }
    }
    .close {
      width: 18px;
      height: 18px;
      margin: 0 36px 0 26px;
      cursor: pointer;
      padding: 6px;
      &:hover {
        background: #eef4ff;
        border-radius: 4px;
      }
    }
  }
}
</style>
