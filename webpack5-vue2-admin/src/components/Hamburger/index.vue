<template>
  <div>
    <img
      v-if="isActive"
      class="hamburger"
      src="@/static/icon/side-left.png"
      alt
      srcset
      @click="toggleClick"
    />
    <img
      v-else
      class="hamburger hamburger-right"
      src="@/static/icon/side-right.png"
      alt
      srcset
      @click="toggleClick"
    />
  </div>
</template>

<script>
export default {
  name: "Hamburger",
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
};
</script>

<style scoped>
.hamburger {
  cursor: pointer;
  width: 52px;
  height: 52px;
  transition: 0.28s;
  position: fixed;
  left: 210px;
  top: 6px;
  z-index: 1000;
}
.hamburger-right {
  left: 64px;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
