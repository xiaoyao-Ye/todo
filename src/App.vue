<script setup lang="ts">
import { darkTheme, lightTheme, zhCN, dateZhCN } from 'naive-ui'
import { useGlobalStore } from '@/stores'
import { loading } from './api/helper/loading'

const globalStore = useGlobalStore()

const theme = computed(() => (globalStore.isDark ? darkTheme : lightTheme))
const style = computed(() => {
  const { family, isMax, isDark } = globalStore
  const { common, Card } = theme.value

  const fontFamily = `${family === 'default' ? '' : family + ','}${common.fontFamily}`

  return {
    '--g-is-max': isMax ? '0px' : '10px',
    '--g-radius': isMax ? '0px' : '8px',
    '--g-box-shadow': `0 0 5px 1px ${isDark ? '#333' : '#ccc'}`,

    // "--n-color": common.baseColor,
    '--n-color': common.bodyColor,
    '--n-font-size': common.fontSize,
    '--n-font-family': fontFamily,
    '--n-line-height': common.lineHeight,
    '--n-text-color': common.textColor2,
    '--n-text-color3': common.textColor3,
    '--n-box-shadow1': common.boxShadow1,
    '--n-box-shadow2': common.boxShadow2,
    '--n-box-shadow3': common.boxShadow3,
    '--n-primary': common.primaryColor,
    '--n-border-color': common.dividerColor,
    // n-card
    '--n-card-color': Card.common?.cardColor,
    '--n-divider-color': Card.common?.dividerColor,
    '--n-bezier': Card.common?.cubicBezierEaseInOut,
  }
})
</script>

<template>
  <div class="p-[calc(var(--g-is-max)/2)]" :class="globalStore.isDark ? 'dark' : 'light'" :style="style">
    <div id="variable" class="h-[calc(100vh-var(--g-is-max))]">
      <n-config-provider :inline-theme-disabled="true" :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
        <n-message-provider>
          <n-spin :show="loading" :rotate="false">
            <n-notification-provider to="#variable">
              <Provider>
                <transition name="slide-fade" mode="out-in">
                  <router-view></router-view>
                </transition>
                <!-- <router-view v-slot="{ Component }">
                <transition name="slide-fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view> -->
              </Provider>
            </n-notification-provider>
            <template #icon>
              <Blink />
            </template>
            <template #description>一大波todo即将来袭</template>
          </n-spin>
        </n-message-provider>
        <!-- <n-global-style /> -->
      </n-config-provider>
      <Firework v-if="globalStore.isHappyWork" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#variable {
  overflow: hidden;
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
  box-shadow: var(--g-box-shadow);
  border-radius: var(--g-radius);
  user-select: none;
}
:deep(.n-notification) {
  width: 300px;
}
</style>
