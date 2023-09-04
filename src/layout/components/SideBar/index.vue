<template>
  <div>
    <n-scrollbar class="h-[calc(100vh-40px-40px-10px)]">
      <Menu />
    </n-scrollbar>

    <List v-show="!collapsed" />
  </div>
</template>

<script setup lang="ts">
import Menu from "./Menu.vue"
import List from "./List.vue"
import { collapsed } from "@/stores"
</script>

<style scoped></style>
