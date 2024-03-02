<template>
  <div class="p-4 h-[calc(100vh-40px-var(--g-is-max))] page-bg">
    <div class="pb-4 mb-4 border-b border-[var(--n-divider-color)]">
      <n-page-header subtitle="back" @back="$router.replace('/')"></n-page-header>
    </div>
    <div class="w-2xl m-auto">
      <div>
        <table>
          <thead>
            <th></th>
            <th :colspan="colspan" v-for="({ colspan, month }, i) in thead">
              {{ months[month].slice(0, 3) }}
            </th>
          </thead>
          <tbody>
            <tr v-for="(row, i) in tbody" :key="i">
              <td class="week">
                <span>{{ i % 2 !== 0 ? weeks[i] : '' }}</span>
              </td>
              <td v-for="(item, j) in row" :key="j">
                <n-popover trigger="hover" to="#variable" style="padding: 4px 8px; font-size: 12px">
                  <template #trigger>
                    <div :class="[item?.level, item ? 'box' : '']"></div>
                  </template>
                  <span>{{ item?.tips }}</span>
                </n-popover>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex items-center justify-between px-8">
          <n-popselect v-model:value="year" :options="options" size="medium" scrollable @update:value="getCountByDate">
            <ButtonIcon icon="i-carbon:calendar-heat-map" :text="year || options[0].label" />
          </n-popselect>

          <div class="flex items-center gap-1">
            <div>Less</div>
            <div class="box"></div>
            <div class="box low"></div>
            <div class="box moderate"></div>
            <div class="box high"></div>
            <div class="box veryhigh"></div>
            <div>More</div>
          </div>
        </div>
      </div>

      <n-divider />

      <div>开发中</div>
      <div>头像</div>
      <div>密码</div>
      <div>生日</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { Todo } from '@/api/todo/api'
import { CountTodoVo } from '@/api/todo/typings'

const weeks: { [key: number]: string } = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
const months: { [key: number]: string } = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}
const tbody = ref<(null | { tips: string; level: string })[][]>([])
const thead = ref<{ colspan: number; month: number }[]>([])
const year = ref(undefined)
const options = ref<{ label: string; value: number }[]>([])
getOptions()
function getOptions() {
  for (let i = 2018; i <= new Date().getFullYear(); i++) {
    options.value.unshift({ label: i.toString(), value: i })
  }
}

onMounted(() => {
  getCountByDate()
})

async function getCountByDate() {
  const query = {
    startDate: year.value ? `${year.value}-01-01` : undefined,
    endDate: year.value ? `${year.value}-12-31` : undefined,
  }
  const list = await Todo.countTodo(query)
  const data = everydayBy(list, year.value)
  tbody.value = data.tbody
  thead.value = data.thead.map((item, i) => {
    const nextItem = data.thead[i + 1] || { offset: 53 }
    return { colspan: nextItem.offset - item.offset, month: item.month }
  })
}

// TODO: REFACTOR
function everydayBy(list: CountTodoVo[], year?: number) {
  let startDate = year ? dayjs(`${year}-01-01`) : dayjs().subtract(52, 'week').startOf('week')
  const endDate = year ? dayjs(`${year}-12-31`) : dayjs()
  const tbody: (null | { tips: string; level: string })[][] = [[], [], [], [], [], [], []]
  const thead = []

  let isFirst = true
  while (!startDate.isAfter(endDate)) {
    const week = startDate.day()
    const month = startDate.month()
    const day = startDate.date()

    if (isFirst) {
      isFirst = false
      for (let i = 0; i < week; i++) {
        tbody[i].push(null)
      }
    }

    if (day === 1 && thead.length < 12) {
      let len = tbody[week].length
      len = week === 0 ? len : len + 1
      len = thead.length === 0 && month === 0 ? 0 : len

      thead.push({ offset: len, month })
    }

    const date = startDate.format('YYYY-MM-DD')
    const item = list.find(item => item.date === date)
    const tips = `${item?.count || 'No'} contributions on ${months[month]} ${day}${getDaySuffix(day)}.`
    tbody[week].push({ tips, level: classifyNumbers(item?.count) })

    startDate = startDate.add(1, 'day')
  }

  return { thead, tbody }
}

// TODO: 完善规则
function classifyNumbers(count?: number) {
  if (!count) return ''
  if (count < 3) return 'low'
  if (count < 5) return 'moderate'
  if (count < 10) return 'high'
  return 'veryhigh'
}

// 计算活跃度
// function classifyNumbers(arr: any[]) {
//   const sortedArr = arr.sort((a, b) => a - b)
//   const index80 = Math.floor(arr.length * 0.8)
//   const index60 = Math.floor(arr.length * 0.6)
//   const index30 = Math.floor(arr.length * 0.3)

//   const activeNumbers = sortedArr.slice(index80)
//   const secondaryActiveNumbers = sortedArr.slice(index60, index80)
//   const mediumActiveNumbers = sortedArr.slice(index30, index60)

//   return {
//     activeNumbers,
//     secondaryActiveNumbers,
//     mediumActiveNumbers,
//   }
// }

// 获取天数后缀
function getDaySuffix(day: number) {
  const lastTwoDigits = day % 100
  if ([11, 12, 13].includes(lastTwoDigits)) return 'th'
  const lastDigit = day % 10
  if ([1, 2, 3].includes(lastDigit)) return { 1: 'st', 2: 'nd', 3: 'rd' }[lastDigit]
  return 'th'
}
</script>

<style lang="scss" scoped>
// TODO: 转为原子类
table {
  font-size: 12px;
  border-spacing: 2px; /* 设置表格边框间距 */
  border-collapse: unset;
  th {
    text-align: left;
    font-weight: normal;
  }
  td {
    padding: 0;
  }
  .week {
    position: relative;
    width: 28px;
    span {
      position: absolute;
      bottom: -3px;
    }
  }
}

.box {
  width: 10px;
  height: 10px;
  min-width: 10px;
  min-height: 10px;

  text-align: center;
  /* border: 1px solid #000; */
  background-color: #eee;
  border-radius: 2px;
  transition: background-color 0.3s ease-out;
}

.box.low {
  background-color: #ddd;
}
.box.moderate {
  background-color: #bbb;
}
.box.high {
  background-color: #999;
}
.box.veryhigh {
  background-color: #666;
}

.dark {
  .box {
    background-color: #333;
  }
  .box.low {
    background-color: #666;
  }
  .box.moderate {
    background-color: #999;
  }
  .box.high {
    background-color: #ddd;
  }
  .box.veryhigh {
    background-color: #fff;
  }
}
</style>
