<template>
  <div>
    <n-scrollbar class="h-[calc(100vh-40px-40px-var(--g-is-max))]">
      <Menu />
    </n-scrollbar>

    <List v-show="!globalStore.collapsed || globalStore.isPin" />
  </div>
</template>

<script setup lang="ts">
import Menu from './Menu.vue'
import List from './List.vue'
import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()
</script>

<style scoped></style>
