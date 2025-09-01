<template>
  <div class="error">
    <van-empty :image="error_img" :description="message || '生活总归带点荒谬~'" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      error_img: require("@/static/error/error.png"),
    };
  },
  computed: {
    ...mapState({
      message: (state) => state.user.message,
    }),
  },
  components: {},
};
</script>

<style lang="scss">
.error {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .van-empty {
    transform: translateY(-30%);
    &__description {
      text-align: center;
      padding: 0 160px;
    }
  }
}
</style>
