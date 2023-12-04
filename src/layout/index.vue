<template>
  <div class="h-full">
    <n-layout>
      <n-layout-header bordered class="h-40px">
        <NavBar />
      </n-layout-header>
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
      <!-- <n-layout-footer bordered>Footer Footer Footer</n-layout-footer> -->
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar/index.vue"
import SideBar from "./components/SideBar/index.vue"
import { useGlobalStore } from "@/stores"
const globalStore = useGlobalStore()
window.$message = useMessage()
// 如果一定要解构的话必须要使用 storeToRefs 以保持响应式
// const { collapsed } = storeToRefs(globalStore)
// actions 可以直接结构使用
// const { toggleCollapse } = globalStore
</script>

<style scoped></style>
