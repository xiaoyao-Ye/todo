<template>
  <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" :render-label="renderMenuLabel" />
</template>

<script setup lang="ts">
import { MenuMixedOption, MenuOption } from "naive-ui/es/menu/src/interface"

const router = useRouter()
const to = (path: string) => {
  router.push(path)
}

function renderIcon(icon: string) {
  return () => h("div", { class: icon })
}

function renderMenuLabel(option: MenuOption) {
  // console.log(option)
  return h("div", {
    innerHTML: option.key,
    onClick: () => {
      console.log(option)
      router.push(option.path as string)
    },
  })
}

const menuOptions: MenuMixedOption[] = [
  { key: "任务列表", icon: renderIcon("i-carbon:document-multiple-02"), path: "/" },
  { key: "已完成", icon: renderIcon("i-carbon:task-complete"), path: "/" },
  { key: "今天做点什么呢", icon: renderIcon("i-carbon:task-view"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  { key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" },
  {
    key: "这些比较重要",
    icon: renderIcon("i-carbon:task-star"),
    path: "/",
    children: [{ key: "这些比较重要", icon: renderIcon("i-carbon:task-star"), path: "/" }],
  },
]
</script>

<style scoped></style>
