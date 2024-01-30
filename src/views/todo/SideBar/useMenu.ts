import { MenuOption } from 'naive-ui'
import { ListEntity } from '@/api/todo/typings'
import { renderIcon } from '@/hooks'
import { List } from '@/api/todo/api'
import { Category, useTodoStore } from '@/stores/todo'
import { useDropdown } from './useDropdown'

import { useGlobalStore } from '@/stores'
const globalStore = useGlobalStore()

const fixed = [
  { icon: renderIcon('carbon:ai-status-in-progress'), label: '今天做点什么呢', key: 'today' },
  { icon: renderIcon('carbon:report'), label: '任务列表', key: 'tasks' },
  { icon: renderIcon('carbon:star-review'), label: '这些比较重要', key: 'important' },
  { icon: renderIcon('carbon:status-acknowledge'), label: '已完成', key: 'completed' },
]

const menuOptions: MenuOption[] = reactive([])

async function getMenus() {
  const list = await List.findAll()
  const menuList = convertToTree(list)
  menuOptions.length = 0
  menuOptions.push(...fixed, ...menuList)
}

function convertToTree(list: ListEntity[]) {
  let menuList: MenuOption[] = []
  list.forEach(ele => {
    const parent: any = list.find(item => item.id === ele.pid)
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(ele)
    } else {
      const menu = { icon: renderIcon('carbon:report'), label: ele.name, key: ele.id }
      if (ele.isGroup) menu.children = [] // 渲染为分组
      menuList.push(menu)
    }
  })
  return menuList
}

function removeNode(list: MenuOption[], id: number) {
  list.forEach((ele, index) => {
    if (ele.key === id) {
      list.splice(index, 1)
    } else if (ele.children) {
      removeNode(ele.children, id)
    }
  })
}

function handleMenu(option: MenuOption) {
  if (option.children) return // 分组不需要获取数据
  const listId = option.key
  const url = option.key === 'completed' ? '/todo/completed' : `/todo/list`
  router.value.replace(url)
  useTodoStore().toggleCategory(option.key as Category)
  globalStore.isPin && globalStore.toggleCollapse()
}

function renderNode(option: MenuOption): any {
  return {
    onClick: () => handleMenu(option),
    onContextmenu: (e: MouseEvent) => useDropdown().onShowDropdown(e, option),
  }
}

function removeMenu(id: number) {
  removeNode(menuOptions, id)
}
function addMenu(menu: MenuOption) {
  menuOptions.push(menu)
}

const router = ref()
export function useMenu() {
  if (!router.value) router.value = useRouter()
  return {
    menuOptions,
    getMenus,
    renderNode,
    removeMenu,
    addMenu,
  }
}
