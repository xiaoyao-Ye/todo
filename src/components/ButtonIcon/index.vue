<template>
  <n-button text>
    <div :class="`${icon}`"></div>
  </n-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
}>()
</script>

<style scoped></style>
