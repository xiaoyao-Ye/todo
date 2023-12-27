<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :native-scrollbar="false"
      :collapsed="globalStore.collapsed"
      @update:collapsed="globalStore.toggleCollapse"
      class="h-[calc(100vh-40px-var(--g-is-max))]">
      <SideBar />
    </n-layout-sider>
    <n-layout>
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import SideBar from './SideBar/index.vue'
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()
</script>

<style scoped></style>
