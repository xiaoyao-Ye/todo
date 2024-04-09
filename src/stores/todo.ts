import { Todo } from '@/api/todo/api'
import { TodoEntity } from '@/api/todo/typings'

export type Category = 'today' | 'important' | 'completed' | 'tasks' | string

const setupStore = () => {
  const category = ref<Category>('today')

  const todoList = ref<TodoEntity[]>([])
  const pageNum = ref(1)
  const pageSize = ref(20)
  const total = ref(100)
  async function onGetList() {
    if ((pageNum.value - 1) * pageSize.value > total.value) return
    const query: Record<string, any> = {
      page: pageNum.value,
      limit: pageSize.value,
      sortOrder: category.value === 'completed' ? 'DESC' : sortStatus.value,
      sortBy: category.value === 'completed' ? 'completed_at' : sortCategory.value,
      completed: false,
    }
    // if (category.value !== 'tasks') query[category.value] = true
    if (['today', 'important', 'completed'].includes(category.value)) query[category.value] = true
    if (category.value !== 'completed' && showComplete.value) query.completed = null
    if (!['today', 'important', 'completed', 'tasks'].includes(category.value)) query.list_id = category.value
    const { list, pagination } = await Todo.page(query)
    if (pageNum.value === 1) todoList.value = list
    else todoList.value.push(...list)
    total.value = pagination.total
  }
  async function onRefresh() {
    pageNum.value = 1
    onGetList()
  }

  function toggleCategory(targetCategory: Category) {
    category.value = targetCategory
    onRefresh()
  }

  const sortStatus = ref<'ASC' | 'DESC'>('DESC')
  function toggleSort() {
    sortStatus.value = sortStatus.value === 'ASC' ? 'DESC' : 'ASC'
    onRefresh()
  }
  const sortIcon: Record<string, Record<string, string>> = {
    created_at: { label: '创建日期', icon: 'i-carbon:text-line-spacing' },
    deadline_at: { label: '截止日期', icon: 'i-carbon:hourglass' },
    priority: { label: '优先等级', icon: 'i-carbon:increase-level' },
  }
  const sortCategory = ref<keyof typeof sortIcon>('created_at')
  const sortOptions = Object.keys(sortIcon).map(key => ({
    label: sortIcon[key].label,
    value: key,
  }))

  const showComplete = ref(false)
  function toggleComplete() {
    showComplete.value = !showComplete.value
    onRefresh()
  }

  return {
    category,
    toggleCategory,
    sortStatus,
    toggleSort,
    sortCategory,
    sortIcon,
    sortOptions,
    todoList,
    onGetList,
    onRefresh,
    pageNum,
    showComplete,
    toggleComplete,
  }
}

export const useTodoStore = defineStore('todo', setupStore, { persist: true })
// export const useTodoStore = defineStore('todo', setupStore)
