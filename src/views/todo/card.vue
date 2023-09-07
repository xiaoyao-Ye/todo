<template>
  <div class="card w-full flex items-center mb-4 p-4 border rd" @dblclick.self="onShowEdit">
    <ButtonIcon :icon="isCompleteIcon" @click="toggleComplete" />
    <!-- TODO: 双击编辑内容 -->
    <span v-if="!showEdit" :class="['px-2 flex-1 n-input--focus', todo.done && 'done']" @dblclick.self="onShowEdit">
      {{ todo.title }}
    </span>
    <n-input
      v-if="showEdit"
      ref="inputRef"
      :class="['mx-2 flex-1', todo.done && 'done']"
      v-model:value="todo.title"
      type="textarea"
      :autosize="{ minRows: 1 }"
      @blur="onCloseEdit"
      @keyup.enter="onEdit" />
    <ButtonIcon :icon="isCollectIcon" class="justify-self-end" @click="toggleCollect" />
    <!-- TODO: 提醒是否确认删除 -->
    <ButtonIcon icon="i-carbon:trash-can" class="justify-self-end ml-2" @click="removeTodo" />
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "@/stores/todo"
import { useTodoStore } from "@/stores/todo"
import { InputInst } from "naive-ui/es/input/src/interface"
const todoStore = useTodoStore()

const props = defineProps<{ todo: Todo }>()

function toggleComplete() {
  todoStore.updateTodo({ id: props.todo.id, done: !props.todo.done })
}
const isCompleteIcon = computed(() => {
  return props.todo.done ? "i-carbon:checkmark-outline" : "i-carbon:radio-button"
})

function toggleCollect() {
  todoStore.updateTodo({ id: props.todo.id, important: !props.todo.important })
}
const isCollectIcon = computed(() => {
  return props.todo.important ? "i-carbon:star-filled" : "i-carbon:star"
})

function removeTodo() {
  todoStore.removeTodo(props.todo.id)
}

const inputRef = ref<InputInst | null>(null)
const showEdit = ref(false)
function onCloseEdit() {
  showEdit.value = false
}
function onShowEdit() {
  showEdit.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function onEdit() {
  onCloseEdit()
}
</script>

<style lang="scss" scoped>
.card {
  user-select: none; /* Standard syntax */
  cursor: pointer;
  background-color: var(--n-card-color);
  border-color: var(--n-divider-color);
  transition:
    color 0.3s var(--n-bezier),
    background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier),
    border-color 0.3s var(--n-bezier);
  .n-input {
    background-color: transparent;
  }
  :deep(.n-input__border) {
    display: none;
  }
  :deep(.n-input__state-border) {
    display: none;
  }
}
.done {
  color: var(--n-text-color3);
  text-decoration: line-through;
  :deep(textarea) {
    color: var(--n-text-color3);
    text-decoration: line-through;
  }
}
</style>
