<template>
  <div class="layout">
    <router-view />
    <div class="tabbar">
      <div class="tabbar-main">
        <div class="tabbar__item" :class="{ active: activeIndex == i }" v-for="(v, i) in tabbarList" :key="i" @click="handleTabBar(i)">
          <img :src="activeIndex == i ? v.activeImage : v.image" />
          <p>{{ v.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarList: [
        {
          activeImage: require("@/static/tabbar/index-active.png"),
          image: require("@/static/tabbar/index.png"),
          text: "工作台",
          path: "/",
        },
        {
          activeImage: require("@/static/tabbar/center-active.png"),
          image: require("@/static/tabbar/center.png"),
          text: "中心",
          path: "/center",
        },
        {
          activeImage: require("@/static/tabbar/user-active.png"),
          image: require("@/static/tabbar/user.png"),
          text: "我的",
          path: "/user",
        },
      ],
      activeIndex: 0,
    };
  },
  created() {
    // TODO 初次渲染获取
    this.handleIndex();
  },
  methods: {
    handleIndex() {
      this.activeIndex = this.tabbarList.findIndex((e) => e.path == this.$route.path);
    },
    handleTabBar(index) {
      this.$router.replace({
        path: this.tabbarList[index].path,
      });
    },
  },
  watch: {
    $route(to, from) {
      this.handleIndex();
      // TODO DOM更新完之后再去设置
      this.$nextTick(() => {
        document.scrollingElement.scrollTop = to.meta.scrollTop;
      });
    },
  },
};
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
  padding-bottom: 120px;
  box-sizing: border-box;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  overflow: hidden;
  .tabbar-main {
    height: 120px;
    display: flex;
    background-color: #fff;
    @include hairline-top-relative();
    @include safe-area();
  }
  &__item {
    flex: 1;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 10;
    color: #a0a0a0;
    img {
      width: 47px;
      height: 47px;
    }
    p {
      margin-top: 6px;
    }
    &.active {
      color: #181818;
    }
  }
}
</style>
