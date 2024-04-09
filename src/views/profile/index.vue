<template>
  <div class="p-4 h-[calc(100vh-40px-var(--g-is-max))] page-bg">
    <div class="pb-4 mb-4 border-b border-[var(--n-divider-color)]">
      <n-page-header subtitle="back" @back="$router.replace('/')"></n-page-header>
    </div>
    <div class="w-2xl m-auto">
      <CalendarGraph :data="data" :totalCount="totalCount" @toggleYear="toggleYear" />

      <n-divider />

      <div>开发中</div>
      <div>头像</div>
      <div>密码</div>
      <div>生日</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalendarGraph from './CalendarGraph.vue'
import { Todo } from '@/api/todo/api'
import type { CalendarData } from './calendarGraph'

const data = ref<CalendarData[]>([])
const totalCount = ref<number>(0)

async function toggleYear(year?: number) {
  const query = {
    startDate: year ? `${year}-01-01` : undefined,
    endDate: year ? `${year}-12-31` : undefined,
  }
  const res = await Todo.countTodo(query)
  totalCount.value = res.totalCount
  data.value = res.list
}
</script>

<style lang="scss" scoped></style>
