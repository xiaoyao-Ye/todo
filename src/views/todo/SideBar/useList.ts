import { InputInst, MenuOption } from 'naive-ui'
import { List } from '@/api/todo/api'
import { useMenu } from './useMenu'
import { renderIcon } from '@/hooks'

type ListStatus = 'list' | 'group' | 'rename'

const inputVal = ref<string>('')
const inputRef = ref<InputInst | null>(null)
const inputStatus = ref<ListStatus>()

const placeholder = computed(() => {
  // const names = { list: '添加列表', group: '添加分类' }
  // if (inputStatus.value === 'edit') return '重命名'
  // return `输入名称按 Enter ${names[inputStatus.value!]}`
  return '输入名称按 Enter 确认'
})

function toggleStatus(type: ListStatus) {
  inputStatus.value = type
  nextTick(() => inputRef.value?.focus())
}

function onCancel() {
  inputStatus.value = undefined
  inputVal.value = ''
}

async function onConfirm() {
  const name = inputVal.value.trim()
  if (!name) return
  if (inputStatus.value === 'rename') {
    await List.update({ id: currentMenu.value.key }, { name })
    currentMenu.value!.label = name
  } else {
    onAdd(name)
  }
  onCancel()
}

const currentMenu = ref()
function onRename(menu: MenuOption) {
  toggleStatus('rename')
  inputVal.value = menu.label as string
  currentMenu.value = menu
}

async function onAdd(name: string) {
  // 添加列表/分类
  const isGroup = inputStatus.value === 'group'
  const { id } = await List.create({ name, isGroup })
  const menu: MenuOption = { icon: renderIcon('carbon:report'), key: id, label: name }
  if (isGroup) menu.children = []
  useMenu().addMenu(menu)
}

function onKeyup(e: KeyboardEvent) {
  switch (e.key) {
    case 'Escape':
      onCancel()
      break
    case 'Enter':
      onConfirm()
      break
  }
}

export function useList() {
  return {
    inputStatus,
    inputVal,
    inputRef,
    placeholder,
    onKeyup,
    onCancel,
    toggleStatus,
    onRename,
  }
}
