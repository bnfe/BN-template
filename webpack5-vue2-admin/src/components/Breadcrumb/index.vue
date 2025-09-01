<template>
  <div class="breadcrumb-main">
    <img class="location" src="@/static/icon/location.png" alt />
    <span>当前位置：</span>
    <el-breadcrumb v-if="levelList.length" separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
          <span
            v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
            class="no-redirect"
          >
            {{ item.meta.title }}
          </span>
          <span v-else class="is-redirect" @click.prevent="handleLink(item)">
            {{ item.meta.title }}
          </span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import * as pathToRegexp from "path-to-regexp";
export default {
  data() {
    return {
      levelList: []
    };
  },
  watch: {
    $route(route) {
      // 如果你进入重定向页面，不要更新面包屑
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // 只显示带有 meta.title 的路由
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "dashboard".toLocaleLowerCase();
    },
    pathCompile(path) {
      // https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      let toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb-main {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: max-content;
  line-height: 17px;
  color: #666;
  font-size: 12px;
  .location {
    width: 11px;
    height: 12px;
    margin-right: 3px;
  }
  .el-breadcrumb {
    line-height: 17px;
    margin-left: 10px;
    ::v-deep .el-breadcrumb__inner {
      color: #666;
      font-size: 12px;
    }
    ::v-deep .el-breadcrumb__separator {
      color: #989cac;
      font-size: 12px;
    }
    .is-redirect {
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
    .no-redirect {
      cursor: text;
      color: #00b5ba;
      font-size: 12px;
    }
  }
}
</style>
