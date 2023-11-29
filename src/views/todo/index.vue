<template>
  <div class="flex flex-col p-4 h-[calc(100vh-40px-10px)]">
    <div class="flex items-center justify-between">
      <div class="p-4 min-w-[200px] border border-dashed rd">{{ category }}</div>
      <n-space>
        <!-- 选择排序 -->
        <n-popselect v-model:value="sortCategory" :options="sortOptions" trigger="click">
          <ButtonIcon :icon="sortIcon[sortCategory]" disabled :text="sortCategory || '选择排序'" />
        </n-popselect>
        <!-- 正序/倒序 -->
        <ButtonIcon
          disabled
          :icon="sortStatus === 'ascending' ? 'i-carbon:sort-ascending' : 'i-carbon:sort-descending'"
          :text="sortStatus === 'ascending' ? '正序' : '倒序'"
          @click="toggleSort" />
      </n-space>
    </div>

    <n-scrollbar class="flex-1 px-4 pt-4">
      <TransitionGroup name="list" tag="div">
        <Card v-for="todo in todoList" :key="todo.id" :todo="todo" />
      </TransitionGroup>
    </n-scrollbar>

    <div v-show="category !== 'completed'" class="pt-4">
      <n-input v-model:value="title" round placeholder="输入内容按 Enter 添加代办事项" @keyup.enter="onAddTodo">
        <template #prefix>
          <ButtonIcon icon="i-carbon:task-add" />
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Todo } from "@/api/todo/api"
import Card from "./Card.vue"
import { useTodoStore } from "@/stores/todo"
import { TodoEntity } from "@/api/todo/typings"
const todoStore = useTodoStore()
const { toggleSort, sortIcon, sortOptions } = todoStore
const { todoList, category, sortStatus, sortCategory } = storeToRefs(todoStore)

const title = ref("")
async function onAddTodo() {
  // todoStore.addTodo(title.value)
  await Todo.create({ title: title.value })
  title.value = ""
}
</script>

<style scoped>
.list-move,
/* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
  /* display: none; */
}
</style>
