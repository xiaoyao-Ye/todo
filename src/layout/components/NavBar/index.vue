<template>
  <div class="navBar flex items-center justify-between px-4 h-full">
    <div class="flex-1 flex">
      <!-- <n-avatar round size="small" src="/CarbonCookie.1024.png" /> -->
      <span class="i-carbon:cafe text-xl"></span>
      <!-- <span class="i-carbon:crop-growth text-xl text-orange-300"></span> -->
      <!-- <span class="i-carbon:humidity text-xl"></span> -->
      <!-- <span class="i-carbon:logo-keybase text-xl"></span> -->
      <!-- <span class="i-carbon:palm-tree text-xl"></span> -->
    </div>
    <!-- 这里可以设置成可配置的，可以让用户自己配置显示内容，或者不显示 -->
    <!-- 还可以设置成 search bar 参考钉钉 -->
    <div>
      <n-gradient-text type="success">
        {{ title }}
        <span v-show="!globalStore.isPin">I'm hungry.</span>
      </n-gradient-text>
    </div>
    <n-space class="flex-1" justify="end" align="center">
      <UserInfo />
      <ToolButton />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import UserInfo from './UserInfo.vue'
import ToolButton from './ToolButton.vue'
import { ipcRenderer } from 'electron'
import { useGlobalStore } from '@/stores/index'
const globalStore = useGlobalStore()

const title = ref('')
function getDate() {
  // const date = new Date().toLocaleDateString()
  const date = new Date()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = date.getDay()
  const dayOfWeekMap = ['日', '一', '二', '三', '四', '五', '六']
  title.value = `星期${dayOfWeekMap[week]} ${month}月${day}日.`

  // const dayOfWeekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  // title.value = `${dayOfWeekMap[week]} ${month}月${day}日. I'm hungry.`
}

getDate()
ipcRenderer.on('focus', () => {
  getDate()
})

// ipcRenderer.on('pin', () => {
//   console.log(`( ipcRenderer.on('pin') )===============>`)
// })
// ipcRenderer.on('unpin', () => {
//   console.log(`( ipcRenderer.on('unpin') )===============>`)
// })

const isMac = process.platform === 'darwin'
console.log(`( isMac )===============>`, isMac)
</script>

<style scoped lang="scss">
.navBar {
  // 禁用文本选择
  -webkit-user-select: none;
  // 可以拖动
  -webkit-app-region: drag;

  // 排除按钮拖动
  :deep(.n-button) {
    -webkit-app-region: no-drag;
  }

  :deep(.n-avatar) {
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
}
</style>
