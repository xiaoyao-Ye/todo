<template>
  <n-space align="center">
    <ButtonIcon :icon="globalStore.isPin ? 'i-carbon:pin-filled' : 'i-carbon:pin'" class="font-size-4" @click="onPin" />
    <ButtonIcon icon="i-carbon:subtract" class="font-size-5" @click="onMinimize" />
    <!-- <ButtonIcon v-if="!isMax" icon="i-carbon:maximize" class="font-size-4" @click="isMax = !isMax" /> -->
    <!-- <ButtonIcon v-if="!isMax" icon="i-carbon:stop" class="font-size-4" @click="isMax = !isMax" /> -->
    <!-- <ButtonIcon v-else icon="i-carbon:minimize" class="font-size-4" @click="isMax = !isMax" /> -->
    <ButtonIcon
      v-if="!globalStore.isPin"
      :icon="globalStore.isMax ? 'i-carbon:minimize' : 'i-carbon:stop'"
      class="font-size-4"
      @click="onChangeWinSize" />
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

function onPin() {
  globalStore.toggleCollapse(globalStore.isPin)
  globalStore.isPin = !globalStore.isPin
  ipcRenderer.send(globalStore.isPin ? 'window.pin' : 'window.unpin')
}
</script>

<style scoped></style>
