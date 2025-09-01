<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component v-if="route.meta.keepAlive" :is="Component" :key="route.fullPath" />
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" :key="route.fullPath" />
  </router-view>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<style lang="scss"></style>
