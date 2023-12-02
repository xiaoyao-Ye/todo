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
import bookImage from "/book.png"
import { router } from "@/router"
import { useGlobalStore } from "@/stores"
const globalStore = useGlobalStore()

const options = [
  { label: "个人资料", key: "profile" },
  { label: "退出登录", key: "logout" },
  // {    label: '退出登录', key: 'logout',    // icon: renderIcon(LogoutIcon)  }
]
function handleSelect(key: string | number) {
  if (key === "logout") {
    localStorage.removeItem("token")
    router.replace("/login")
  }
}
</script>

<style scoped></style>
