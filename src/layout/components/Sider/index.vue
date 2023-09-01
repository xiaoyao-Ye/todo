<template>
  <div>
    <n-scrollbar class="h-[calc(100vh-40px-40px-10px)]">
      <Menu />
    </n-scrollbar>
    <n-space
      v-show="!collapsed"
      justify="space-evenly"
      align="center"
      class="sider-footer flex items-center justify-center h-40px">
      <ButtonIcon icon="i-carbon:task-add" text="新建任务" />
      <ButtonIcon icon="i-carbon:task-add" text="新建任务" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue"
import { collapsed } from "@/stores"
</script>

<style scoped>
@keyframes identifier {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.sider-footer {
  border-top: 1px solid var(--n-border-color);
  animation: identifier 1.5s ease;
}
</style>
