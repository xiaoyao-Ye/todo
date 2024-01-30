<template>
  <n-menu
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    :node-props="renderNode"
    :default-value="todoStore.category" />
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="position.x"
    :y="position.y"
    :options="options"
    :show="showDropdown"
    :on-clickoutside="() => (showDropdown = false)"
    @select="onSelect" />
</template>

<script setup lang="ts">
import { useMenu } from './useMenu'
import { useDropdown } from './useDropdown'
import { useTodoStore } from '@/stores/todo'
const todoStore = useTodoStore()

const { showDropdown, position, options, onSelect } = useDropdown()
const { getMenus, renderNode, menuOptions } = useMenu()

onMounted(() => {
  getMenus()
  // todoStore.toggleCategory(todoStore.category)
})
</script>

<style scoped></style>
