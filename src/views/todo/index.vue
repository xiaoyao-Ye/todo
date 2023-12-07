<template>
  <div class="texture flex flex-col p-4 h-[calc(100vh-40px-var(--g-is-max))]">
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

    <n-scrollbar class="flex-1 px-4 pt-4" :onScroll="onScroll">
      <TransitionGroup name="list" tag="div">
        <div v-for="(todo, index) in todoList" :key="todo.id">
          <Card :todo="todo" :index="index" @showDetail="onShowDetail" />
        </div>
      </TransitionGroup>
      <LoadMore ref="loadMore" />
    </n-scrollbar>

    <div v-show="category !== 'completed'" class="pt-4">
      <n-input v-model:value="title" round placeholder="输入内容按 Enter 添加代办事项" @keyup.enter="onAddTodo">
        <template #prefix>
          <ButtonIcon icon="i-carbon:task-add" />
        </template>
      </n-input>
    </div>

    <Drawer v-model="showDetail" :id="detailId" />
  </div>
</template>

<script setup lang="ts">
import Card from "./Card.vue"
import Drawer from "./Drawer.vue"
import { Todo } from "@/api/todo/api"
import { useTodoStore } from "@/stores/todo"
import { CreateTodoDto } from "@/api/todo/typings"
import { throttle } from "@/utils"

const todoStore = useTodoStore()
const { toggleSort, sortIcon, sortOptions } = todoStore
const { pageNum, todoList, category, sortStatus, sortCategory } = storeToRefs(todoStore)

const title = ref("")
async function onAddTodo() {
  const query: CreateTodoDto = { title: title.value }
  if (["today", "important"].includes(category.value)) [(query[category.value as "today" | "important"] = true)]
  const todo = await Todo.create(query)
  todoList.value.unshift(todo)
  title.value = ""
}

const loadMore = ref<unknown>(null)
const onScroll = throttle(this, async () => {
  const scrollTop = (loadMore.value as any).$el?.getBoundingClientRect().top
  if (scrollTop < window.innerHeight + 300) {
    pageNum.value += 1
    await todoStore.onGetList()
  }
})

const detailId = ref()
const showDetail = ref(false)
function onShowDetail(id: number) {
  detailId.value = id
  showDetail.value = true
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
