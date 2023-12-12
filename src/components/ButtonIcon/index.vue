<template>
  <n-button text>
    <span :class="`${icon}`"></span>
    <span v-if="text" class="pl-2">{{ text }}</span>
  </n-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  text?: string
}>()
</script>

<style scoped></style>
