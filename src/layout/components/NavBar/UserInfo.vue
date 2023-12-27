<template>
  <n-space justify="end" align="center">
    <ButtonIcon
      :icon="globalStore.isDark ? 'i-carbon:moon' : 'i-carbon:light'"
      class="font-size-4"
      @click="globalStore.toggleTheme" />
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
      <n-avatar round size="small" :src="bookImage" />
    </n-dropdown>
  </n-space>
</template>

<script setup lang="ts">
import bookImage from '/book.png'
import { router } from '@/router'
import { renderIcon } from '@/hooks'
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()

const options = [
  { label: '全局设置', key: 'settings', icon: renderIcon('carbon:settings') },
  { label: '个人资料', key: 'profile', icon: renderIcon('carbon:identification') },
  { label: '退出登录', key: 'logout', icon: renderIcon('carbon:ibm-cloud-privileged-access-gateway') },
]
function handleSelect(key: string | number) {
  if (key === 'logout') {
    localStorage.removeItem('token')
    router.replace('/login')
  } else {
    router.push(`/${key}`)
  }
}
</script>

<style scoped></style>
