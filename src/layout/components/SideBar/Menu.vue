<template>
  <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" :node-props="renderNode" />
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="x"
    :y="y"
    :options="options"
    :show="showDropdown"
    :on-clickoutside="onClickoutside"
    @select="handleSelect" />
</template>

<script setup lang="ts">
import { toggleCategory } from "@/stores/todo"
import { MenuGroupOption, MenuMixedOption, MenuOption } from "naive-ui/es/menu/src/interface"

const router = useRouter()
const message = useMessage()

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)
const options = [
  { label: "重命名", key: "rename" },
  { label: "删除", key: "delete" },
]

function onClickoutside() {
  showDropdown.value = false
}

function handleSelect(key: string | number) {
  showDropdown.value = false
  message.info(String(key))
}

function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

function handleMenu(option: MenuOption | MenuGroupOption) {
  if (option.path) return router.push(option.path as string)
  if (option.category) {
    toggleCategory(option.category as string)
    if (!router.currentRoute.value.fullPath.includes("/todo")) {
      router.push("/todo")
    }
  }
}

const renderNode: any = (option: MenuOption | MenuGroupOption) => {
  // console.log(option)
  return {
    onClick: () => handleMenu(option),
    onContextmenu: handleContextMenu,
  }
}

function renderIcon(icon: string) {
  return () => h("div", { class: icon })
}
const menuOptions: MenuMixedOption[] = [
  { icon: renderIcon("i-carbon:document-multiple-02"), label: "任务列表", key: "任务列表", path: "/home" },
  { icon: renderIcon("i-carbon:task-view"), label: "今天做点什么呢", key: "今天做点什么呢", category: "today" },
  { icon: renderIcon("i-carbon:task-complete"), label: "已完成", key: "已完成", category: "complete" },
  { icon: renderIcon("i-carbon:task-star"), label: "这些比较重要", key: "这些比较重要", category: "important" },
  // {
  //   label: "这些比较重要",
  //   key: "这些比较重要",
  //   icon: renderIcon("i-carbon:task-star"),
  //   path: "/",
  //   children: [{ key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" }],
  // },
]
</script>

<style scoped></style>
