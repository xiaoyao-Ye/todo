<template>
  <div class="navBar flex items-center justify-between px-4 h-full">
    <div class="flex-1 flex">
      <n-avatar round size="small" src="/favicon.ico" />
    </div>
    <!-- 这里可以设置成可配置的，可以让用户自己配置显示内容，或者不显示 -->
    <!-- 还可以设置成 search bar 参考钉钉 -->
    <div>
      <n-gradient-text type="success">星期一9月4日. I'm hungry.</n-gradient-text>
    </div>
    <n-space class="flex-1" justify="end" align="center">
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
