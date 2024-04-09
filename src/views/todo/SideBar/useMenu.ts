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

function createMenu(menu: ListEntity) {
  const { name, id, isGroup } = menu
  const icon = renderIcon('carbon:report')
  return { icon, label: name, key: id, isGroup }
}

function convertToTree(list: ListEntity[]) {
  let menuList: MenuOption[] = []
  list.forEach(item => {
    if (item.isGroup || item.pid === 0) {
      const menu: any = createMenu(item)
      // 渲染为分组
      if (item.isGroup) {
        menu.children = []
        list.forEach(child => {
          if (child.pid === item.id) {
            const menuS = createMenu(child)
            menu.children.push(menuS)
          }
        })
      }
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
  if (option.children || useTodoStore().category == option.key) return // 分组不需要获取数据
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
  if (useTodoStore().category == id.toString()) {
    useTodoStore().toggleCategory('tasks')
  }
}

const router = ref()
export function useMenu() {
  if (!router.value) router.value = useRouter()
  return {
    menuOptions,
    getMenus,
    renderNode,
    removeMenu,
  }
}
