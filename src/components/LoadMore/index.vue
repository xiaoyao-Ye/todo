<template>
  <div v-if="isNull" class="text-center pt-40">做点什么吧~</div>
  <div v-else class="text-center">我也是有底线的~</div>
</template>

<script setup lang="ts">
defineProps<{
  isNull: boolean
}>()
</script>

<style scoped></style>
