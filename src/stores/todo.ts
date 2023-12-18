import { Todo } from '@/api/todo/api'
import { TodoEntity } from '@/api/todo/typings'

export type Category = 'today' | 'important' | 'completed' | 'tasks'

const setupStore = () => {
  const category = ref<Category>('today')

  const todoList = ref<TodoEntity[]>([])
  const pageNum = ref(1)
  const pageSize = ref(10)
  const total = ref(100)
  async function onGetList() {
    if ((pageNum.value - 1) * pageSize.value > total.value) return
    const query: Record<string, any> = {
      page: pageNum.value,
      limit: pageSize.value,
    }
    if (category.value !== 'tasks') query[category.value] = true
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
    pageNum.value = 1
    onRefresh()
  }

  const sortStatus = ref<'ascending' | 'descending'>('ascending')
  function toggleSort() {
    sortStatus.value = sortStatus.value === 'ascending' ? 'descending' : 'ascending'
  }
  const sortIcon = {
    默认排序: '',
    按重要性排序: 'i-carbon:star-filled',
    按到期时间排序: 'i-carbon:hourglass',
    按字母排序: 'i-carbon:character-sentence-case',
  }
  const sortCategory = ref<keyof typeof sortIcon>('默认排序')
  const sortOptions = Object.keys(sortIcon).map(item => ({
    label: item,
    value: item,
  }))

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
  }
}

export const useTodoStore = defineStore('todo', setupStore, { persist: true })
