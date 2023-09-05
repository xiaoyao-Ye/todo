<template>
  <div class="flex flex-col p-4 h-[calc(100vh-40px-10px)]">
    <div class="flex items-center justify-between">
      <span>{{ category }}</span>
      <n-space>
        <!-- 选择排序/按xx排序 -->
        <ButtonIcon :icon="sortIcon" text="选择排序" @click="toggleSort" />
        <!-- 正序/倒序 -->
        <ButtonIcon :icon="sortIcon" text="倒序" @click="toggleSort" />
      </n-space>
    </div>

    <n-layout :native-scrollbar="false" class="flex-1 pl-4">
      <div>content</div>
    </n-layout>

    <div class="pt-4">
      <!-- TODO: logic -->
      <n-input v-model:value="value" round placeholder="输入内容按 Enter 添加代办事项">
        <template #prefix>
          <ButtonIcon icon="i-carbon:task-add" />
        </template>
      </n-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { category } from "@/stores/todo"

const value = ref("")

const sortCategory = ref<"ascending" | "descending">("ascending")
function toggleSort() {
  sortCategory.value = sortCategory.value === "ascending" ? "descending" : "ascending"
}
const sortIcon = computed(() => {
  const icons = {
    // TODO: 重要性/到期时间/字母排序/创建时间
    ascending: "i-carbon:sort-ascending",
    descending: "i-carbon:sort-descending",
  }
  return icons[sortCategory.value]
})

watchEffect(() => {
  console.log(category.value)
})
</script>

<style scoped></style>
