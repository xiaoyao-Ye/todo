<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui"
import { isDark } from "@/stores"

const theme = computed(() => (isDark.value ? darkTheme : lightTheme))
const style = computed(() => {
  console.log(theme.value)
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
    "--n-border-color": theme.value.common.dividerColor,
    "box-shadow": `0 0 5px 1px ${isDark.value ? "#333" : "#ccc"}`,
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
// 一个设置了 display: inline-flex; 的标签（通常是一个容器元素）包裹在 img 标签中，
// 而且外面的标签也设置了 display: inline-flex; 或者其他垂直对齐属性时，可能会出现额外的高度。
// 这是因为内部的 img 元素被视为基线元素，而 display: inline-flex; 的容器会在基线元素的基础上创建弹性容器。
// 默认情况下，弹性容器（display: inline-flex; 或 display: flex;）会尝试基于基线元素来对齐内容。
// 在这种情况下，如果容器内部的 img 元素的高度大于容器的基线，容器会在基线的基础上增加额外的空白空间
// 解决办法是设置 vertical-align: middle; 或者是将 display: inline-flex; 设置为 display: flex;
// .n-avatar {
//   vertical-align: middle;
// }
// 发现 naive-ui 很多组件都是用的 inline-flex, 目前 n-space 包裹的发现了这个问题, 那就先只解决 n-space 下的元素
.n-space > div > * {
  vertical-align: middle;
}
#app {
  padding: 5px;
}
#variable {
  overflow: hidden;
  height: calc(100vh - 10px);
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
