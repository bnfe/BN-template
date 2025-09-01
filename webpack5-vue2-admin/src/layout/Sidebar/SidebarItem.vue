<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
          class="only-one-child-menu-item"
        >
          <div class="custom-item">
            <i v-if="onlyOneChild.meta.icon" :class="onlyOneChild.meta.icon"></i>
            <span slot="title">{{ onlyOneChild.meta.title }}</span>
          </div>
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body class="has-child-menu">
      <template slot="title">
        <i v-if="item.meta.icon" :class="item.meta.icon"></i>
        <span v-if="item.meta" slot="title">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // 临时设置（如果只有一个显示将使用）
          this.onlyOneChild = item;
          return true;
        }
      });

      // 当只有一个子路由时，默认显示子路由
      if (showingChildren.length === 1) {
        return true;
      }

      // 如果没有要显示的子路由，则显示父级
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (this.isExternal(routePath)) {
        return routePath;
      }
      if (this.isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  flex: 1;
  &--horizontal {
    border: 0 !important;
  }
}
.submenu-title-noDropdown {
  &:hover {
    border-radius: 8px !important;
  }
  &.is-active {
    border-radius: 8px !important;
  }
}
// 没有子菜单的item
.only-one-child-menu-item {
  display: flex;
  align-items: center;
  padding-left: 44px !important;
  i {
    right: 0 !important;
    transform: translateY(2px);
    color: rgba(255, 255, 255, 0.65) !important;
    margin-bottom: 5px;
  }
  span {
    color: rgba(255, 255, 255, 0.65) !important;
  }
  &:hover {
    i {
      color: rgba(255, 255, 255, 0.85) !important;
    }
    span {
      color: rgba(255, 255, 255, 0.85) !important;
    }
  }
  &:is-active {
    i {
      color: rgba(255, 255, 255, 1) !important;
    }
    span {
      color: rgba(255, 255, 255, 1) !important;
    }
  }
}
// 有子菜单的
.has-child-menu {
  .el-submenu__title,
  .nest-menu {
    display: flex;
    align-items: center;
    i {
      right: 0 !important;
      transform: translateY(2px);
      color: rgba(255, 255, 255, 0.65) !important;
      margin-bottom: 5px;
    }
    span {
      color: rgba(255, 255, 255, 0.65) !important;
    }
    &:hover {
      i {
        color: rgba(255, 255, 255, 0.85) !important;
      }
      span {
        color: rgba(255, 255, 255, 0.85) !important;
      }
    }
  }
  .custom-item {
    text-align: center;
    width: 100%;
    margin: 10px !important;
  }
  &::v-deep .el-submenu__title {
    padding-left: 42px !important;
    padding-right: 10px !important;
    &:hover {
      border-radius: 8px !important;
    }
  }
  &::v-deep .el-submenu__icon-arrow {
    right: 10px !important;
  }
}
.has-child-menu.is-opened {
  &::v-deep .el-submenu__title,
  .el-menu-item {
    background-color: rgba(62, 101, 236, 0.2) !important;
  }
  // 有子菜单的标题
  &::v-deep .el-submenu__title {
    border-radius: 8px 8px 0 0 !important;
    i {
      color: rgba(255, 255, 255, 0.85) !important;
    }
    span {
      color: rgba(255, 255, 255, 0.85) !important;
    }
  }
  // 有子菜单的item
  &::v-deep .el-menu-item {
    text-align: center;
    padding: 0 !important;
    i {
      color: rgba(255, 255, 255, 0.65) !important;
    }
    span {
      color: rgba(255, 255, 255, 0.65) !important;
    }
    &.is-active {
      .custom-item {
        text-align: center;
        width: 100%;
        background-color: rgba(63, 101, 236, 0.6) !important;
        border-radius: 18px !important;
      }
      i {
        color: rgba(255, 255, 255, 1) !important;
      }
      span {
        color: rgba(255, 255, 255, 1) !important;
      }
    }

    &:hover {
      i {
        color: rgba(255, 255, 255, 0.85) !important;
      }
      span {
        color: rgba(255, 255, 255, 0.85) !important;
      }
    }
  }
  &::v-deep .nest-menu:nth-last-child(1) .el-menu-item {
    border-radius: 0 0 8px 8px !important;
  }
}
// 折叠菜单
.el-menu--collapse {
  .has-child-menu.is-opened {
    &::v-deep .el-submenu__title {
      border-radius: 8px !important;
    }
  }
}
.el-menu-item.is-active {
  color: #fff !important;
}
.el-menu-item.is-active span {
  width: 100%;
  color: #fff !important;
}
.el-menu-item.is-active i {
  color: #fff !important;
}
// 设置icon样式
.el-menu-item {
  & [class^="el-icon-"] {
    margin-right: 8px;
  }
}
</style>
