<template>
  <!-- <n-button text @click="onclick"> -->
  <n-button text>
    <span :class="`${icon}`"></span>
    <span v-if="text" class="pl-2">{{ text }}</span>
  </n-button>
</template>

<script setup lang="ts">
// import { useGlobalStore } from '@/stores'
// 因为是组件, 外面如果绑定了 @click 事件会覆盖掉这个事件, 可能在这里使用指令合适点(当前button创建时额外添加click事件)
// const onclick = (e: MouseEvent) => {
//   if (!useGlobalStore().isHappyWork) return
//   const el = e.target as HTMLElement
//   el.classList!.add('happy-work')
//   setTimeout(() => {
//     el.classList.remove('happy-work')
//   }, 450)
// }

const props = defineProps<{
  icon: string
  text?: string
}>()
</script>

<style scoped></style>
