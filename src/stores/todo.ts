import { Todo } from "@/api/todo/api"
import { TodoEntity } from "@/api/todo/typings"

export type Category = "today" | "important" | "completed" | "tasks"

// export interface Todo {
//   id: number
//   completed: boolean
//   important: boolean
//   title: string
//   category?: Category
//   content?: string
//   createdAt: string
//   updatedAt?: string
//   deadlineAt?: string
// }

const setupStore = () => {
  const category = ref<Category>("today")

  const todoList = ref<TodoEntity[]>([])
  const pageNum = ref(1)
  const pageSize = ref(10)
  const total = ref(100)
  async function onGetList() {
    if ((pageNum.value - 1) * pageSize.value > total.value) return
    const query: Record<string, any> = { page: pageNum.value, limit: pageSize.value }
    if (category.value !== "tasks") query[category.value] = true
    const { list, pagination } = await Todo.page(query)
    if (pageNum.value === 1) todoList.value = list
    else todoList.value.push(...list)
    total.value = pagination.total
  }

  function toggleCategory(targetCategory: Category) {
    category.value = targetCategory
    pageNum.value = 1
    onGetList()
  }
  function filterList() {
    if (category.value === "tasks") {
      todoListFiltered.value = [...todoList.value]
    } else if (["important", "completed"].includes(category.value)) {
      todoListFiltered.value = [...todoList.value.filter(item => item[category.value as "important" | "completed"])]
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

  const todoListFiltered = ref<TodoEntity[]>([])

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
  async function createTodo(title: string): Promise<TodoEntity> {
    await Todo.create({ title, [category.value]: category.value })
    return {
      id: Date.now(),
      // completed: category.value === "completed",
      important: category.value === "important",
      today: category.value === "today",
      title,
      // category: category.value,
      createdAt: new Date().toLocaleString(),
    }
  }
  async function addTodo(title: string) {
    if (title.trim() === "") return
    const todo = await createTodo(title)
    todoList.value.push(todo)
    filterList()
  }

  function updateTodo(todo: Partial<TodoEntity>) {
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
    onGetList,
    pageNum,
  }
}

export const useTodoStore = defineStore("todo", setupStore, { persist: true })
