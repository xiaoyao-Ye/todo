<template>
  <div class="side-footer flex items-center justify-center h-40px">
    <div v-show="!inputStatus">
      <n-space justify="space-evenly" align="center" :size="30">
        <ButtonIcon icon="i-carbon:task-add" text="新建列表" @click="toggleStatus('list')" />
        <ButtonIcon icon="i-carbon:task-add" text="新建分类" @click="toggleStatus('group')" />
      </n-space>
    </div>

    <div v-show="inputStatus" class="px-4 w-full">
      <n-input ref="inputRef" round v-model:value="inputVal" :placeholder="placeholder" @blur="onCancel" @keyup="onKeyup">
        <template #prefix>
          <ButtonIcon icon="i-carbon:task-add" />
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useList } from './useList'
const { inputStatus, inputVal, inputRef, placeholder, onCancel, onKeyup, toggleStatus } = useList()
</script>

<style scoped>
@keyframes identifier {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.side-footer {
  padding-bottom: 1px;
  border-top: 1px solid var(--n-border-color);
  animation: identifier 1.5s ease;
}
</style>
