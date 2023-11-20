<script setup lang="ts">
import { darkTheme, lightTheme } from "naive-ui"
import { useGlobalStore } from "@/stores"
import { loading } from "./api/helper/loading"

const globalStore = useGlobalStore()

const theme = computed(() => (globalStore.isDark ? darkTheme : lightTheme))
const style = computed(() => {
  console.log(theme.value)
  return {
    // "--n-color": theme.value.common.baseColor,
    "--n-color": theme.value.common.bodyColor,
    "--n-font-size": theme.value.common.fontSize,
    "--n-font-family": theme.value.common.fontFamily,
    "--n-line-height": theme.value.common.lineHeight,
    "--n-text-color": theme.value.common.textColor2,
    "--n-text-color3": theme.value.common.textColor3,
    "--n-box-shadow1": theme.value.common.boxShadow1,
    "--n-box-shadow2": theme.value.common.boxShadow2,
    "--n-box-shadow3": theme.value.common.boxShadow3,
    "--n-primary": theme.value.common.primaryColor,
    "--n-border-color": theme.value.common.dividerColor,
    "box-shadow": `0 0 5px 1px ${globalStore.isDark ? "#333" : "#ccc"}`,
    // n-card
    "--n-card-color": theme.value.Card.common?.cardColor,
    "--n-divider-color": theme.value.Card.common?.dividerColor,
    "--n-bezier": theme.value.Card.common?.cubicBezierEaseInOut,
  }
})
</script>

<template>
  <div :class="{ 'app-bg': true, isMax: globalStore.isMax }">
    <div id="variable" :style="style">
      <n-config-provider :inline-theme-disabled="true" :theme="theme">
        <n-message-provider>
          <n-spin :show="loading">
            <router-view></router-view>
            <!-- <template #icon>
            自定义icon
          </template> -->
            <!-- <template #description>
            你不知道你有多幸运
          </template> -->
          </n-spin>
        </n-message-provider>
        <!-- <n-global-style /> -->
      </n-config-provider>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-bg {
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

.app-bg.isMax {
  padding: 0;

  #variable {
    height: 100vh;
    border-radius: 0;
  }
}
</style>
