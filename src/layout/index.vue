<template>
  <div class="h-full">
    <n-layout>
      <n-layout-header bordered class="h-40px">
        <NavBar />
      </n-layout-header>

      <n-layout>
        <transition name="slide-fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <!-- <router-view v-slot="{ Component }">
          <transition name="slide-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view> -->
      </n-layout>
      <!-- <n-layout-footer bordered>Footer Footer Footer</n-layout-footer> -->
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar/index.vue'

// 如果一定要解构的话必须要使用 storeToRefs 以保持响应式
// const { collapsed } = storeToRefs(globalStore)
// actions 可以直接结构使用
// const { toggleCollapse } = globalStore
</script>

<style scoped></style>
