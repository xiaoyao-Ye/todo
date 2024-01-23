<template>
  <n-layout has-sider>
    <n-layout-sider
      v-if="!globalStore.isPin"
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

  <StarBg v-if="globalStore.isStar" />

  <n-drawer
    v-if="globalStore.isPin"
    v-model:show="globalStore.collapsed"
    display-directive="show"
    width="220"
    placement="left"
    to="#variable"
    :style="drawerStyle">
    <n-drawer-content>
      <template #header>
        <ButtonIcon icon="i-carbon:cookie" class="text-5"></ButtonIcon>
      </template>
      <n-scrollbar>
        <SideBar />
      </n-scrollbar>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import SideBar from './SideBar/index.vue'
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()

const drawerStyle = {
  top: `calc(var(--g-is-max) / 2)`,
  bottom: `calc(var(--g-is-max) / 2)`,
  left: `calc(var(--g-is-max) / 2)`,
  borderRadius: `var(--g-radius)`,
}
</script>

<style lang="scss" scoped>
:deep(.n-drawer-header) {
  height: 40px;
}
:deep(.n-drawer-body-content-wrapper) {
  padding: 0 !important;
}
</style>
