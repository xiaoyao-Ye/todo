import { List } from '@/api/todo/api'
import { MenuOption } from 'naive-ui'
import { useMenu } from './useMenu'
import { useList } from './useList'

const showDropdown = ref(false)
const position = reactive({ x: 0, y: 0 })
const options = [
  // TODO: 分组可以添加分组和添加列表
  // { label: '添加分组', key: 'group' },
  // { label: '添加列表', key: 'list' },
  { label: '重命名', key: 'rename' },
  { label: '删除', key: 'delete' },
]

const currentMenu = ref<MenuOption>()
async function onSelect(key: string | number) {
  showDropdown.value = false
  if (key === 'rename') {
    useList().onRename(currentMenu.value!)
  } else if (key === 'delete') {
    const id = currentMenu.value!.key as number
    await List.remove({ id })
    useMenu().removeMenu(id)
  }
  // const message = useMessage()
  // message.info('success')
}

function onShowDropdown(e: MouseEvent, option: MenuOption) {
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    currentMenu.value = option
    position.x = e.clientX
    position.y = e.clientY
    showDropdown.value = true
  })
}

export function useDropdown() {
  return {
    showDropdown,
    position,
    options,
    onSelect,
    onShowDropdown,
  }
}
