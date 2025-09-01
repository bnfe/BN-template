<template>
  <van-dialog v-model="show" :show-confirm-button="false" :closeOnClickOverlay="true" @overlay="handleClose">
    <slot></slot>
    <van-icon name="close" size="40" color="#fff" @click="handleClose" />
  </van-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: this.isShow,
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
  },
};
</script>

<style lang="scss">
.van-icon-close {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -120px;
}
</style>
