<template>
  <n-space justify="end" align="center">
    <ButtonIcon :icon="isDark ? 'i-carbon:moon' : 'i-carbon:light'" class="font-size-5" @click="changeTheme" />
    <n-avatar round src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
  </n-space>
</template>

<script setup lang="ts">
import { changeTheme, isDark } from "@/stores"
</script>

<style scoped></style>
