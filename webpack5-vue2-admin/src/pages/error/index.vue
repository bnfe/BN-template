<template>
  <div class="error">
    <div class="error-con">
      <img :src="error_img" alt />
      <div class="error-desc">
        <p class="title">404 资源不存在</p>
        <p class="desc">生活总归带点荒谬~</p>
        <a class="back" href>返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      error_img: require("@/static/error/404.png")
    };
  }
};
</script>

<style lang="scss" scoped>
.error {
  height: 100%;
  .error-con {
    transform: translate(-50%, -50%);
    position: absolute;
    top: 40%;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 200px;
    }
    .error-desc {
      margin-left: 60px;
      white-space: nowrap;
      .title {
        font-size: 32px;
      }
      .desc {
        margin-top: 12px;
        color: #666;
        font-size: 14px;
      }
      .back {
        margin-top: 60px;
        width: 110px;
        height: 36px;
        line-height: 36px;
        background: $theme-color;
        border-radius: 6px;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
