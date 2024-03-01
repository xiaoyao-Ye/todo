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
              {{ months[month] }}
            </th>
          </thead>
          <tbody>
            <tr v-for="(row, i) in tbody" :key="i">
              <td class="week">
                <span>{{ i % 2 !== 0 ? weeks[i] : '' }}</span>
              </td>
              <td :class="item ? 'box' : ''" v-for="(item, j) in row" :key="j">
                <!-- {{ item }} -->
              </td>
            </tr>
          </tbody>
        </table>

        <div class="level">
          <div>Less</div>
          <div class="box"></div>
          <div class="box low"></div>
          <div class="box moderate"></div>
          <div class="box high"></div>
          <div class="box veryhigh"></div>
          <div>More</div>
        </div>
      </div>

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

const weeks: { [key: number]: string } = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' }
const months: { [key: number]: string } = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}
const tbody = ref<(null | number)[][]>([])
const thead = ref<{ colspan: number; month: number }[]>([])

onMounted(() => {
  // getCountByDate()

  const data = everydayBy()
  // const data = everydayBy(2023)
  // const data = everydayBy(2022)
  tbody.value = data.tbody
  thead.value = data.months.map((item, i) => {
    const nextItem = data.months[i + 1] || { offset: 53 }
    return { colspan: nextItem.offset - item.offset, month: item.month }
  })
})

// async function getCountByDate() {
//   const res = await Todo.countTodo()
//   console.log(`( index.vue: res )===============>`, res)
// }

function everydayBy(year?: number) {
  let startDate = year ? dayjs(`${year}-01-01`) : dayjs().subtract(52, 'week').startOf('week')
  const endDate = year ? dayjs(`${year}-12-31`) : dayjs()
  const tbody: (null | number)[][] = [[], [], [], [], [], [], []]
  const months = []

  // 打印日期
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

    if (day === 1 && months.length < 12) {
      console.log(months.length)

      let len = tbody[week].length
      len = week === 0 ? len : len + 1
      len = months.length === 0 && month === 0 ? 0 : len
      console.log(`( index.vue: len )===============>`, len)

      months.push({ offset: len, month })
    }

    tbody[week].push(day)

    startDate = startDate.add(1, 'day')
  }

  // TODO: tbody
  // { month, day, contributions, ... }

  return { months, tbody }
}

// 计算活跃度
function classifyNumbers(arr: any[]) {
  const sortedArr = arr.sort((a, b) => a - b)
  const index80 = Math.floor(arr.length * 0.8)
  const index60 = Math.floor(arr.length * 0.6)
  const index30 = Math.floor(arr.length * 0.3)

  const activeNumbers = sortedArr.slice(index80)
  const secondaryActiveNumbers = sortedArr.slice(index60, index80)
  const mediumActiveNumbers = sortedArr.slice(index30, index60)

  return {
    activeNumbers,
    secondaryActiveNumbers,
    mediumActiveNumbers,
  }
}

// 获取天数后缀
function getDaySuffix(day: number) {
  const lastTwoDigits = day % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th'

  const lastDigit = day % 10

  switch (lastDigit) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

// service format
// const tasksByDay = tasks.reduce((result, task) => {
//   const taskDate = new Date(task.createdAt); // 假设任务对象中有一个 createdAt 属性表示创建日期
//   const dateString = taskDate.toISOString().slice(0, 10); // 将日期转换为字符串格式 "YYYY-MM-DD"

//   if (!result[dateString]) {
//     result[dateString] = 0; // 初始化日期对应的任务数量为 0
//   }

//   result[dateString]++; // 增加该日期对应的任务数量

//   return result;
// }, {});
</script>

<style lang="scss" scoped>
table {
  font-size: 12px;
  border-spacing: 2px; /* 设置表格边框间距 */
  border-collapse: unset;
  th {
    text-align: left;
    font-weight: normal;
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

.level {
  padding: 4px 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  .low {
    background-color: #ddd;
  }
  .moderate {
    background-color: #bbb;
  }
  .high {
    background-color: #999;
  }
  .veryhigh {
    background-color: #666;
  }
}

.dark {
  .box {
    background-color: #333;
  }
  .low {
    background-color: #666;
  }
  .moderate {
    background-color: #999;
  }
  .high {
    background-color: #ddd;
  }
  .veryhigh {
    background-color: #fff;
  }
}
</style>
