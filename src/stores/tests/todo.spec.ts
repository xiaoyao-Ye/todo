import { it, expect, describe } from "vitest"
import { setActivePinia } from "pinia"
import { useTodoStore } from "../todo"

describe("todo", () => {
  it("should add todo to list when successful", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    const title = "code"

    todoStore.addTodo(title)

    expect(todoStore.todoList[0].title).toBe(title)
  })

  it("should add todo to list when selecting a category", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    todoStore.toggleCategory("important")

    todoStore.addTodo("code")

    expect(todoStore.todoList[0].title).toBe("code")
    expect(todoStore.todoList[0].category).toBe("important")
    expect(todoStore.todoList[0].important).toBe(true)
  })

  it("should not add todo when title is empty", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    const title = ""

    todoStore.addTodo(title)

    expect(todoStore.todoList.length).toBe(0)
  })

  it("should not update todo when id is invalid", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    const title = "code"
    todoStore.addTodo(title)

    expect(() => todoStore.updateTodo({ title: "code2" })).toThrowError("id invalid")
    // expect(todoStore.todoList[0].title).toBe(title)
  })

  it("should update todo when successful", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    todoStore.addTodo("code")
    const todo = todoStore.todoList[0]
    const updatedTodo = { id: todo.id, title: "code2", important: true, done: true }

    todoStore.updateTodo(updatedTodo)

    expect(todoStore.todoList[0].title).toBe(updatedTodo.title)
    expect(todoStore.todoList[0].important).toBe(updatedTodo.important)
    expect(todoStore.todoList[0].done).toBe(updatedTodo.done)
  })

  it("should remove todo when the todo id is valid", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    todoStore.addTodo("code")
    const todo = todoStore.todoList[0]

    todoStore.removeTodo(todo.id)

    expect(todoStore.todoList.length).toBe(0)
  })

  it("should not remove todo when id is invalid", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    todoStore.addTodo("code")

    todoStore.removeTodo(-1)

    expect(todoStore.todoList.length).toBe(1)
  })

  it("should filter todo by category", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    todoStore.addTodo("code") // 默认添加分类为 tasks
    todoStore.toggleCategory("today")
    todoStore.addTodo("code")

    expect(todoStore.todoListFiltered.length).toBe(1)
  })

  it("should filter done todo by category", () => {
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    todoStore.addTodo("code")

    todoStore.todoList[0].done = true

    todoStore.toggleCategory("done")

    expect(todoStore.todoListFiltered.length).toBe(1)
  })
})
