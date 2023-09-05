<template>
  <div class="card flex items-center mb-4 p-4 border rd">
    <ButtonIcon :icon="isCompleteIcon" @click="toggleComplete" />
    <!-- TODO: 双击编辑内容 -->
    <span class="px-2 flex-1" :class="[isCompleted && 'completed']">今天没吃饭</span>
    <ButtonIcon :icon="isCollectIcon" class="justify-self-end" @click="toggleCollect" />
    <!-- TODO: 提醒是否确认删除 -->
    <ButtonIcon icon="i-carbon:trash-can" class="justify-self-end ml-2" />
  </div>
</template>

<script setup lang="ts">
const isCompleted = ref(false)
function toggleComplete() {
  isCompleted.value = !isCompleted.value
}
const isCompleteIcon = computed(() => {
  return isCompleted.value ? "i-carbon:checkmark-outline" : "i-carbon:radio-button"
})

const isCollected = ref(false)
function toggleCollect() {
  isCollected.value = !isCollected.value
}
const isCollectIcon = computed(() => {
  return isCollected.value ? "i-carbon:star-filled" : "i-carbon:star"
})
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--n-card-color);
  border-color: var(--n-divider-color);
  transition:
    color 0.3s var(--n-bezier),
    background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier),
    border-color 0.3s var(--n-bezier);
}
.completed {
  color: var(--n-text-color3);
  text-decoration: line-through;
}
</style>
