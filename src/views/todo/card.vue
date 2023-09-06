<template>
  <div class="card flex items-center mb-4 p-4 border rd">
    <ButtonIcon :icon="isCompleteIcon" @click="toggleComplete" />
    <!-- TODO: 双击编辑内容 -->
    <span class="px-2 flex-1" :class="[todo.done && 'done']">{{ todo.title }}</span>
    <ButtonIcon :icon="isCollectIcon" class="justify-self-end" @click="toggleCollect" />
    <!-- TODO: 提醒是否确认删除 -->
    <ButtonIcon icon="i-carbon:trash-can" class="justify-self-end ml-2" @click="removeTodo" />
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "@/stores/todo"
import { useTodoStore } from "@/stores/todo"
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
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--n-card-color);
  border-color: var(--n-divider-color);
  transition:
    color 0.3s var(--n-bezier),
    background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier),
    border-color 0.3s var(--n-bezier);
}
.done {
  color: var(--n-text-color3);
  text-decoration: line-through;
}
</style>
