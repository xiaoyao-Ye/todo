<template>
  <div class="h-full">
    <n-layout>
      <n-layout-header bordered class="h-40px">
        <NavBar />
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :native-scrollbar="false"
          :collapsed="globalStore.collapsed"
          @update:collapsed="globalStore.toggleCollapse"
          class="h-[calc(100vh-40px-var(--g-is-max))]">
          <SideBar />
        </n-layout-sider>
        <n-layout>
          <router-view></router-view>
        </n-layout>
      </n-layout>
      <!-- <n-layout-footer bordered>Footer Footer Footer</n-layout-footer> -->
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { TOKEN } from '@/constant'
import NavBar from './components/NavBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()
window.$message = useMessage()
// 如果一定要解构的话必须要使用 storeToRefs 以保持响应式
// const { collapsed } = storeToRefs(globalStore)
// actions 可以直接结构使用
// const { toggleCollapse } = globalStore

const getToken = () => localStorage.getItem(TOKEN)
// const eventSource = new EventSource('http://120.79.135.213:1024/api/sse')
const eventSource = ref<EventSource>()
if (getToken()) {
  eventSource.value = new EventSource('/api/v1/sse')
  eventSource.value.onmessage = ({ data }) => {
    console.log(`( data )===============>${new Date().toLocaleString()}`, data)
    // const message = document.createElement('li')
    // message.innerText = 'New message: ' + data
    // document.body.appendChild(message)
  }
}

onUnmounted(() => {
  eventSource.value?.close()
})
</script>

<style scoped></style>
