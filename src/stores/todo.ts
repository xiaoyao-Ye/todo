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
  const category = ref<Category>("tasks")
  function toggleCategory(targetCategory: string) {
    category.value = targetCategory
  }

  const todoList = ref<Todo[]>([])
  const todoListFiltered = computed<Todo[]>(() => {
    if (category.value === "tasks") return todoList.value
    return ["important", "done"].includes(category.value)
      ? todoList.value.filter(item => item[category.value as "important" | "done"])
      : todoList.value.filter(item => item.category === category.value)
  })
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
  }

  function updateTodo(todo: Partial<Todo>) {
    if (!todo.id) throw new Error("id invalid")
    // 这里可能会调用接口
    // const index = todoList.value.findIndex(f => f.id)
    // if (index === -1) throw new Error("id invalid")
    todo.updatedAt = new Date().toLocaleString()
    // todoList.value[index] = { ...todoList.value[index], ...todo }

    todoList.value = todoList.value.map(item => (item.id === todo.id ? { ...item, ...todo } : item))
  }

  function removeTodo(id: number) {
    todoList.value = todoList.value.filter(item => item.id !== id)
  }

  return { category, toggleCategory, todoList, todoListFiltered, addTodo, updateTodo, removeTodo }
}

export const useTodoStore = defineStore("todo", setupStore, { persist: true })
