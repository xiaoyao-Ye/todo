<template>
  <div class="side-footer flex items-center justify-center h-40px">
    <div v-show="!isAddStatus">
      <n-space justify="space-evenly" align="center" :size="30">
        <ButtonIcon disabled icon="i-carbon:task-add" text="新建列表" @click="toggleStatus('list')" />
        <ButtonIcon disabled icon="i-carbon:task-add" text="新建分类" @click="toggleStatus('group')" />
      </n-space>
    </div>

    <div v-show="isAddStatus" class="px-4 w-full">
      <n-input ref="inputRef" round v-model:value="name" :placeholder="placeholder" @blur="onClose" @keyup="handleKeyup">
        <template #prefix>
          <ButtonIcon icon="i-carbon:task-add" />
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputInst } from 'naive-ui/es/input/src/interface'

type ListStatus = 'list' | 'group'

const isAddStatus = ref<ListStatus>()
const name = ref<string>('')
const inputRef = ref<InputInst | null>(null)
const placeholder = computed(() => {
  const names = { list: '添加列表', group: '添加分类' }
  return `输入名称按 Enter ${names[isAddStatus.value!]}`
})

function handleFocus() {
  nextTick(() => {
    inputRef.value?.focus()
  })
}
function onClose() {
  isAddStatus.value = undefined
}

function toggleStatus(type: ListStatus) {
  isAddStatus.value = type
  handleFocus()
}

function handleKeyup(e: any) {
  if (e.key === 'Enter') {
    onAdd()
  } else if (e.key === 'Escape') {
    onClose()
  }
}

function onAdd() {
  console.log(isAddStatus.value === 'list' ? 'list' : 'group')
  // 添加列表/分类

  onClose()
  name.value = ''
}
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
