export type Category = "today" | "important" | "tasks" | "done" | string
export interface Todo {
  id: number
  done: boolean
  important: boolean
  title: string
  category?: Category
  content?: string
  createdAt: string
  updatedAt?: string
  deadlineAt?: string
}

const setupStore = () => {
  const category = ref<Category>("today")
  function toggleCategory(targetCategory: string) {
    category.value = targetCategory
    todoListFiltered.value.length = 0
    filterList()
  }
  function filterList() {
    if (category.value === "tasks") {
      todoListFiltered.value = [...todoList.value]
    } else if (["important", "done"].includes(category.value)) {
      todoListFiltered.value = [...todoList.value.filter(item => item[category.value as "important" | "done"])]
    } else {
      todoListFiltered.value = [...todoList.value.filter(item => item.category === category.value)]
    }
  }

  const sortStatus = ref<"ascending" | "descending">("ascending")
  function toggleSort() {
    sortStatus.value = sortStatus.value === "ascending" ? "descending" : "ascending"
  }
  const sortIcon = {
    "默认排序": "",
    "按重要性排序": "i-carbon:star-filled",
    "按到期时间排序": "i-carbon:hourglass",
    "按字母排序": "i-carbon:character-sentence-case",
  }
  const sortCategory = ref<keyof typeof sortIcon>("默认排序")
  const sortOptions = Object.keys(sortIcon).map(item => ({ label: item, value: item }))

  const todoList = ref<Todo[]>([])
  const todoListFiltered = ref<Todo[]>([])

  // sort 目前启用这种方式会有引用问题
  // watchEffect(() => {
  //   const isAsc = sortStatus.value === "ascending"
  //   if (sortCategory.value === "默认排序") {
  //     filterList()
  //     return
  //   }
  //   todoListFiltered.value.sort((a: any, b: any) => {
  //     if (sortCategory.value === "按重要性排序") {
  //       return (a.important && a.important && 0) || (a.important && a.important && isAsc) ? 1 : -1
  //     } else if (sortCategory.value === "按到期时间排序") {
  //       if (!a.deadlineAt) return 0
  //       if (!b.deadlineAt) return 0
  //       const dateNow = new Date(a.deadlineAt).getTime() < new Date(a.deadlineAt).getTime()
  //       return isAsc ? (dateNow ? 1 : -1) : dateNow ? -1 : 1
  //     } else if (sortCategory.value === "按字母排序") {
  //       return isAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  //     }
  //   })
  // })

  // 这里可能会调用接口
  function createTodo(title: string): Todo {
    return {
      id: Date.now(),
      done: category.value === "done",
      important: category.value === "important",
      title,
      category: category.value,
      createdAt: new Date().toLocaleString(),
    }
  }
  function addTodo(title: string) {
    if (title.trim() === "") return
    const todo = createTodo(title)
    todoList.value.push(todo)
    filterList()
  }

  function updateTodo(todo: Partial<Todo>) {
    if (!todo.id) throw new Error("id invalid")
    // 这里可能会调用接口
    // const index = todoList.value.findIndex(f => f.id)
    // if (index === -1) throw new Error("id invalid")
    todo.updatedAt = new Date().toLocaleString()
    // todoList.value[index] = { ...todoList.value[index], ...todo }

    todoList.value = todoList.value.map(item => (item.id === todo.id ? { ...item, ...todo } : item))
    filterList()
  }

  function removeTodo(id: number) {
    todoList.value = todoList.value.filter(item => item.id !== id)
    filterList()
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
    todoListFiltered,
    addTodo,
    updateTodo,
    removeTodo,
  }
}

export const useTodoStore = defineStore("todo", setupStore, { persist: true })
