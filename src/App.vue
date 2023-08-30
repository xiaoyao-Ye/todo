<script setup lang="ts">
import { theme } from "ant-design-vue"
console.log(theme)

// import { theme } from "@/stores"
</script>

<template>
  <a-config-provider :theme="theme">
    <!-- <n-config-provider :inline-theme-disabled="true" :theme="theme"> -->
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="scss">
body {
  background-color: transparent !important;
}
#app {
  min-height: 100vh;
  border-radius: 8px;
  overflow: hidden;
  // background-color: var(--n-color);
}
::root {
  /* font-family: v-sans, v-mono, other-fallbacks; */
}
</style>
