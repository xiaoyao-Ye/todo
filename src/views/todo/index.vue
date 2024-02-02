<template>
  <div class="texture flex flex-col p-4 h-[calc(100vh-40px-var(--g-is-max))]">
    <div class="flex items-center justify-between">
      <div v-if="!globalStore.isPin" class="p-4 min-w-[200px] border border-dashed rd">
        {{ category }}
      </div>
      <ButtonIcon v-else icon="i-carbon:menu" @click="toggleMenu" />
      <n-space>
        <n-popover trigger="hover">
          <template #trigger>
            <ButtonIcon :icon="showComplete ? 'i-carbon:ai-status-complete' : 'i-carbon:ai-status'" @click="toggleComplete" />
          </template>
          <span>{{ showComplete ? '点击隐藏已完成' : '点击显示已完成' }}</span>
        </n-popover>
        <!-- 选择排序 -->
        <n-popselect v-model:value="sortCategory" :options="sortOptions" trigger="click" @update:value="onUpdate">
          <ButtonIcon :icon="sortIcon[sortCategory].icon" :text="sortIcon[sortCategory].label" />
        </n-popselect>
        <!-- 正序/倒序 -->
        <ButtonIcon
          :icon="sortStatus === 'ASC' ? 'i-carbon:sort-ascending' : 'i-carbon:sort-descending'"
          :text="sortStatus === 'ASC' ? '正序' : '倒序'"
          @click="toggleSort" />
      </n-space>
    </div>

    <n-scrollbar ref="scrollbarRef" class="flex-1 px-2 pt-4" :onScroll="onScroll">
      <TransitionGroup name="list" tag="div">
        <div v-for="(todo, index) in todoList" :key="todo.id">
          <Card :todo="todo" :index="index" :isPin="globalStore.isPin" @showDetail="onShowDetail" />
        </div>
      </TransitionGroup>
      <LoadMore ref="loadMore" :isNull="todoList.length === 0" />
    </n-scrollbar>

    <div class="pt-4">
      <n-input ref="inputRef" v-model:value="title" round placeholder="输入内容按 Enter 添加代办事项" @keyup.enter="onAddTodo">
        <template #prefix>
          <ButtonIcon icon="i-carbon:document-add" />
        </template>
      </n-input>
    </div>

    <Drawer v-model="showDetail" :id="detailId" />
  </div>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import Drawer from './Drawer.vue'
import { Todo } from '@/api/todo/api'
import { useTodoStore } from '@/stores/todo'
import { useGlobalStore } from '@/stores/index'
import { CreateTodoDto } from '@/api/todo/typings'
import { throttle } from '@/utils'
import { InputInst } from 'naive-ui'

const todoStore = useTodoStore()
const globalStore = useGlobalStore()
const { toggleSort, sortIcon, sortOptions, toggleComplete } = todoStore
const { pageNum, todoList, category, sortStatus, sortCategory, showComplete } = storeToRefs(todoStore)

function toggleMenu() {
  globalStore.toggleCollapse()
}

function onUpdate() {
  todoStore.onGetList()
}

const title = ref('')
async function onAddTodo() {
  if (title.value.trim() === '') return
  const query: CreateTodoDto = { title: title.value }
  if (['today', 'important'].includes(category.value)) [(query[category.value as 'today' | 'important'] = true)]
  if (!['today', 'important', 'completed', 'tasks'].includes(category.value)) query.list_id = +category.value
  scrollbarRef.value.scrollTo(0)
  const todo = await Todo.create(query)
  todoList.value.unshift(todo)
  title.value = ''
}

const scrollbarRef = ref<any>(null)
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

const inputRef = ref<InputInst | null>(null)
function focus(event: KeyboardEvent) {
  if (event.key !== 'Tab') return
  inputRef.value?.focus()
}
onMounted(() => {
  document.addEventListener('keyup', focus)
})
onUnmounted(() => {
  document.removeEventListener('keyup', focus)
})
</script>

<style scoped></style>
