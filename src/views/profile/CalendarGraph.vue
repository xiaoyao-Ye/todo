<template>
  <div class="max-w-[42rem]">
    <table class="text-xs border-separate border-spacing-1/2">
      <thead>
        <th></th>
        <th :colSpan="colSpan" v-for="{ colSpan, month } in thead" :key="month" class="text-left font-normal">
          {{ month }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(row, i) in tbody" :key="weeks[i]">
          <td class="relative w-8">
            <span class="absolute bottom-[-3px]">{{ i % 2 !== 0 ? weeks[i] : '' }}</span>
          </td>
          <td class="p-0" v-for="(cell, j) in row" :key="j">
            <n-popover v-if="cell" trigger="hover" to="#variable" style="padding: 4px 8px; font-size: 12px">
              <template #trigger>
                <div :class="[cell.bg, 'cell']"></div>
              </template>
              <span>{{ cell.tips }}</span>
            </n-popover>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex items-center justify-between px-8 py-2">
      <n-popselect v-model:value="year" :options="yearOptions" size="medium" scrollable @update:value="initTable(year)">
        <ButtonIcon icon="i-carbon:calendar-heat-map" :text="year || yearOptions[0].label" />
      </n-popselect>

      <div class="flex items-center gap-1 text-xs">
        <div>Less</div>
        <div class="cell"></div>
        <div class="cell low"></div>
        <div class="cell moderate"></div>
        <div class="cell high"></div>
        <div class="cell higher"></div>
        <div>More</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { useCalendarGraph } from './calendarGraph'
import type { CalendarData, EmitsType } from './calendarGraph'

const props = defineProps<{ data: CalendarData[] }>()
const emits = defineEmits<EmitsType>()

const { initTable, renderBody, weeks, thead, tbody, year, yearOptions } = useCalendarGraph(emits)

onMounted(() => {
  initTable()
})

watchEffect(() => (tbody.value = renderBody(props.data)))
</script>

<style lang="scss" scoped>
/** TODO: 转为原子类 */
table {
  font-size: 12px;
  border-spacing: 2px;
  /* 设置表格边框间距 */
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

.cell {
  width: 10px;
  height: 10px;
  min-width: 10px;
  min-height: 10px;

  text-align: center;
  /* border: 1px solid #000; */
  background-color: #ebedf0;
  border-radius: 2px;
  transition: background-color 0.3s ease-out;
}

.cell.low {
  background-color: #9be9a8;
}
.cell.moderate {
  background-color: #40c463;
}
.cell.high {
  background-color: #30a14e;
}
.cell.higher {
  background-color: #216e39;
}

.dark {
  .cell {
    background-color: #22272e;
  }
  .cell.low {
    background-color: #0e4429;
  }
  .cell.moderate {
    background-color: #006d32;
  }
  .cell.high {
    background-color: #26a641;
  }
  .cell.higher {
    background-color: #39d353;
  }
}
</style>
