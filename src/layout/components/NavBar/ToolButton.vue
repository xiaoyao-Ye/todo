<template>
  <n-space align="center">
    <ButtonIcon icon="i-carbon:subtract" class="font-size-5" @click="onMinimize" />
    <!-- <ButtonIcon v-if="!isMax" icon="i-carbon:maximize" class="font-size-4" @click="isMax = !isMax" /> -->
    <!-- <ButtonIcon v-if="!isMax" icon="i-carbon:stop" class="font-size-4" @click="isMax = !isMax" /> -->
    <!-- <ButtonIcon v-else icon="i-carbon:minimize" class="font-size-4" @click="isMax = !isMax" /> -->
    <ButtonIcon :icon="globalStore.isMax ? 'i-carbon:minimize' : 'i-carbon:stop'" class="font-size-4" @click="onChangeWinSize" />
    <ButtonIcon icon="i-carbon:close" class="font-size-5" @click="onClose" />
  </n-space>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/stores'
import { ipcRenderer } from 'electron'

// const isMax = ref(false)
const { toggleIsMax } = useGlobalStore()
const globalStore = useGlobalStore()
ipcRenderer.on('window.maximized', (e: any, arg: boolean) => {
  // isMax.value = arg
  toggleIsMax(arg)
})

const onChangeWinSize = () => {
  ipcRenderer.send('win.changeWinSize')
}

const onMinimize = () => {
  ipcRenderer.send('win.minimize')
}
const onClose = () => {
  ipcRenderer.send('win.close')
}
</script>

<style scoped></style>
