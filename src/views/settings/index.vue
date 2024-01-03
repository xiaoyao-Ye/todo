<template>
  <div class="p-4 h-[calc(100vh-40px-var(--g-is-max))] page-bg">
    <div class="pb-4 mb-4 border-b border-[var(--n-divider-color)]">
      <n-page-header subtitle="让你的听觉更懂视觉" @back="$router.replace('/')"></n-page-header>
    </div>
    <div class="w-xl m-auto">
      <n-space align="center">
        <span>是否开启 HappyWork 模式</span>
        <n-switch :round="false" v-model:value="globalStore.isHappyWork" />
      </n-space>
      <n-space align="center">
        <span>是否开启黑暗模式</span>
        <n-switch :round="false" v-model:value="globalStore.isDark" />
      </n-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
.n-space {
  margin-bottom: 8px;
}
</style>
