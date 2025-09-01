<template>
  <div class="home">
    <div class="home-sub">
      <img src="@/static/login/welcome.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .home-sub {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 500px;
    }
  }
}
</style>
