<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui"
import { isDark } from "@/stores"
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : lightTheme">
    <router-view></router-view>
    <n-global-style />
  </n-config-provider>
</template>

<style>
::root {
  /* font-family: v-sans, v-mono, other-fallbacks; */
}
</style>
