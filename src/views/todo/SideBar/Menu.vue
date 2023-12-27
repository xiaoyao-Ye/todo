<template>
  <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" :node-props="renderNode" default-value="today" />
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
import { MenuGroupOption, MenuMixedOption, MenuOption } from 'naive-ui/es/menu/src/interface'
import { Category, useTodoStore } from '@/stores/todo'
import { renderIcon } from '@/hooks'
const todoStore = useTodoStore()

const router = useRouter()
const message = useMessage()

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)
const options = [
  { label: '重命名', key: 'rename' },
  { label: '删除', key: 'delete' },
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
    todoStore.toggleCategory(option.category as Category)
    if (!router.currentRoute.value.fullPath.includes('/todo')) {
      router.push('/todo')
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

// TODO: 整个菜单都应该放到 store 里面
const menuOptions: MenuMixedOption[] = [
  {
    icon: renderIcon('carbon:ai-status-in-progress'),
    label: '今天做点什么呢',
    key: 'today',
    category: 'today',
  },
  {
    icon: renderIcon('carbon:report'),
    label: '任务列表',
    key: 'tasks',
    category: 'tasks',
  },
  {
    icon: renderIcon('carbon:star-review'),
    label: '这些比较重要',
    key: 'important',
    category: 'important',
  },
  {
    icon: renderIcon('carbon:status-acknowledge'),
    label: '已完成',
    key: 'completed',
    category: 'completed',
  },
  // { icon: renderIcon("carbon:document-multiple-02"), label: "home", key: "home", path: "/home" },
  // {
  //   label: "这些比较重要",
  //   key: "这些比较重要",
  //   icon: renderIcon("carbon:task-star"),
  //   path: "/",
  //   children: [{ key: "这些比较重要", icon: renderIcon("carbon:task-star"), path: "/" }],
  // },
]

onMounted(() => {
  todoStore.toggleCategory('today')
})
</script>

<style scoped></style>
