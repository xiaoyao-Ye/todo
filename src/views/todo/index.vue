<template>
  <div class="flex flex-col p-4 h-[calc(100vh-40px-10px)]">
    <div class="flex items-center justify-between">
      <div class="p-4 min-w-[200px] border border-dashed rd">{{ todoStore.category }}</div>
      <n-space>
        <!-- 选择排序 -->
        <n-popselect v-model:value="sortCategory" :options="options" trigger="click">
          <ButtonIcon :icon="sortIcon[sortCategory]" :text="sortCategory || '选择排序'" />
        </n-popselect>
        <!-- 正序/倒序 -->
        <ButtonIcon
          :icon="sortStatus === 'ascending' ? 'i-carbon:sort-ascending' : 'i-carbon:sort-descending'"
          :text="sortStatus === 'ascending' ? '正序' : '倒序'"
          @click="toggleSort" />
      </n-space>
    </div>

    <n-scrollbar class="flex-1 px-4 pt-4">
      <Card v-for="todo in todoStore.todoListFiltered" :key="todo.id" :todo="todo" />
    </n-scrollbar>

    <div v-show="todoStore.category !== 'done'" class="pt-4">
      <!-- TODO: logic -->
      <n-input v-model:value="title" round placeholder="输入内容按 Enter 添加代办事项" @keyup.enter="onAddTodo">
        <template #prefix>
          <ButtonIcon icon="i-carbon:task-add" />
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "./Card.vue"
import { useTodoStore } from "@/stores/todo"
const todoStore = useTodoStore()

const sortIcon = {
  "默认排序": "",
  "按重要性排序": "i-carbon:star-filled",
  "按到期时间排序": "i-carbon:hourglass",
  "按字母排序": "i-carbon:character-sentence-case",
}
const sortCategory = ref<keyof typeof sortIcon>("默认排序")
const options = Object.keys(sortIcon).map(item => ({ label: item, value: item }))

const sortStatus = ref<"ascending" | "descending">("ascending")
function toggleSort() {
  sortStatus.value = sortStatus.value === "ascending" ? "descending" : "ascending"
}

watchEffect(() => {
  console.log(todoStore.category)
  console.log(todoStore.todoListFiltered.length)
})

const title = ref("")
function onAddTodo() {
  todoStore.addTodo(title.value)
  title.value = ""
}
</script>

<style scoped></style>
