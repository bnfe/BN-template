<template>
  <div class="test">
    <p class="title">{{ title }}</p>
    <van-button type="primary" @click="handleClick">pinia增加({{ counter.count }})</van-button>
    <van-button type="primary" @click="handleRequest">测试request</van-button>
    <van-button type="primary" @click="handlePath">路由跳转</van-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
import { useCounterStore } from "@/store/counter";
import { GET } from "@/utils/request";
import { useRouter } from "vue-router";
import { UserInfo } from "@/api/index";

const counter = useCounterStore();
const router = useRouter();

const handleClick = () => {
  counter.increment();
};
const handleRequest = async () => {
  let res = await UserInfo({
    mobile: "13837987714",
  });
  console.log(res);
};
const handlePath = () => {
  router.push({ name: "error" });
};
</script>

<style lang="scss">
.test {
  padding: 20px;
  .title {
    font-size: 24px;
  }
  .van-button {
    margin-right: 20px;
  }
}
</style>
