<template>
  <n-space justify="end" align="center">
    <ButtonIcon
      :icon="globalStore.isDark ? 'i-carbon:moon' : 'i-carbon:light'"
      class="font-size-4"
      @click="globalStore.toggleTheme" />
    <n-avatar round size="small" src="/favicon.ico" />
  </n-space>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores"
const globalStore = useGlobalStore()
</script>

<style scoped></style>
