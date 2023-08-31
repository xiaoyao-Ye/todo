<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui"
import { isDark } from "@/stores"

const theme = computed(() => (isDark.value ? darkTheme : lightTheme))
const style = computed(() => {
  // console.log(theme.value)
  return {
    // "--n-color": theme.value.common.baseColor,
    "--n-color": theme.value.common.bodyColor,
    "--n-font-size": theme.value.common.fontSize,
    "--n-font-family": theme.value.common.fontFamily,
    "--n-line-height": theme.value.common.lineHeight,
    "--n-text-color": theme.value.common.textColor2,
    "--n-box-shadow1": theme.value.common.boxShadow1,
    "--n-box-shadow2": theme.value.common.boxShadow2,
    "--n-box-shadow3": theme.value.common.boxShadow3,
    "--n-primary": theme.value.common.primaryColor,
  }
})
</script>

<template>
  <div id="variable" :style="style">
    <n-config-provider :inline-theme-disabled="true" :theme="theme">
      <n-message-provider>
        <router-view></router-view>
      </n-message-provider>
      <!-- <n-global-style /> -->
    </n-config-provider>
  </div>
</template>

<style lang="scss">
// 使用 <n-space> 组件后, n-space 子元素的高会莫名奇妙变高。需要添加以下样式才能解决。
div {
  display: inherit;
}
#variable {
  overflow: hidden;
  min-height: 100vh;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  padding: 0px;
  margin: 0px;
  color: var(--n-text-color);
  font-size: var(--n-font-size);
  font-family: var(--n-font-family);
  line-height: var(--n-line-height);
  transition:
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s,
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  background-color: var(--n-color);
  border-radius: 8px;
}
</style>
