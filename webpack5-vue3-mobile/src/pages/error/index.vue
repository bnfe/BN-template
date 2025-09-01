<template>
  <div class="error">
    <van-empty :image="error_img" :description="message" />
  </div>
</template>

<script setup lang="ts">
import error_img from "@/static/error/error.png";
import { ref } from "vue";
const message = ref("生活总归带点荒谬~");
</script>

<style lang="scss">
.error {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .van-empty {
    transform: translateY(-30%);
  }
}
</style>
