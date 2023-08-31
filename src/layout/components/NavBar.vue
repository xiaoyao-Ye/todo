<template>
  <div class="navBar flex items-center justify-between">
    <div class="flex-1">left</div>
    <div>center</div>
    <n-space class="h-full flex-1" justify="end" align="center">
      <UserInfo />
      <ToolButton />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import UserInfo from "./UserInfo.vue"
import ToolButton from "./ToolButton.vue"
</script>

<style scoped lang="scss">
.navBar {
  height: 40px;
  // background-color: #fff;
  // 可以拖动
  -webkit-app-region: drag;
  // 禁用文本选择
  -webkit-user-select: none;
  -webkit-app-region: drag;
  // 排除按钮拖动
  &:deep(button, div, img) {
    -webkit-app-region: no-drag;
  }
}
</style>
