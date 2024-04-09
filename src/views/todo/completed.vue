<template>
  <div class="texture flex flex-col p-4 h-[calc(100vh-40px-var(--g-is-max))]">
    <div class="flex items-center justify-between">
      <div v-if="!globalStore.isPin" class="p-4 min-w-[200px] border border-dashed rd">
        {{ category }}
      </div>
      <ButtonIcon v-else icon="i-carbon:menu" @click="toggleMenu" />
      <n-space>
        <!-- 选择排序 -->
        <ButtonIcon icon="i-carbon:ai-status-complete" text="完成时间" />
        <!-- 正序/倒序 -->
        <ButtonIcon icon="i-carbon:sort-descending" text="倒序" />
      </n-space>
    </div>

    <n-scrollbar ref="scrollbarRef" class="flex-1 px-2 pt-4" :onScroll="onScroll">
      <n-timeline>
        <n-timeline-item v-for="(list, key) in timeLineObj" :key="key">
          <!-- <TransitionGroup name="list" tag="div"> -->
          <div v-for="(todo, index) in list" :key="todo.id">
            <Card :todo="todo" :isPin="globalStore.isPin" :index="index" />
            <!-- @showDetail="onShowDetail" -->
          </div>
          <!-- </TransitionGroup> -->
          <template #header>{{ key }}</template>
          <!-- <template #footer>{{ list.length }}</template> -->
        </n-timeline-item>
        <n-timeline-item>~</n-timeline-item>
      </n-timeline>
      <LoadMore ref="loadMore" :isNull="todoList.length === 0" />
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { TodoEntity } from '@/api/todo/typings'
import Card from './Card.vue'
import { useTodoStore } from '@/stores/todo'
import { useGlobalStore } from '@/stores/index'
import { throttle } from '@/utils'
import { formatDate } from '@/utils/date'

const todoStore = useTodoStore()
const globalStore = useGlobalStore()
const { pageNum, todoList, category } = storeToRefs(todoStore)

function toggleMenu() {
  globalStore.toggleCollapse()
}

const timeLineObj = ref<Record<string, TodoEntity[]>>({})
watchEffect(() => {
  const obj: Record<string, TodoEntity[]> = {}
  // TODO: 每次都重新计算, 不是很合理
  todoList.value.forEach(item => {
    // TODO: 这里可以处理成 n分钟前 n小时前
    const date = formatDate(item.completed_at, 'YYYY-MM-DD')
    if (!obj[date]) obj[date] = []
    obj[date].push(item)
  })
  timeLineObj.value = obj
})

const scrollbarRef = ref<any>(null)
const loadMore = ref<unknown>(null)
const onScroll = throttle(this, async () => {
  const scrollTop = (loadMore.value as any).$el?.getBoundingClientRect().top
  if (scrollTop < window.innerHeight + 300) {
    pageNum.value += 1
    await todoStore.onGetList()
  }
})
</script>
